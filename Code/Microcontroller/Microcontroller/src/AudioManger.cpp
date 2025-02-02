#include "AudioManager.h"

AudioManager* AudioManager::instance = nullptr;

void MDCallback(void *cbData, const char *type, bool isUnicode, const char *string) //for debugging
{
  const char *ptr = reinterpret_cast<const char *>(cbData);
  (void) isUnicode;
  char s1[32], s2[64];
  strncpy_P(s1, type, sizeof(s1));
  s1[sizeof(s1)-1]=0;
  strncpy_P(s2, string, sizeof(s2));
  s2[sizeof(s2)-1]=0;
  Serial.printf("METADATA(%s) '%s' = '%s'\n", ptr, s1, s2);
  Serial.flush();
}

void StatusCallback(void *cbData, int code, const char *string) //for debugging
{
  const char *ptr = reinterpret_cast<const char *>(cbData);
  // Note that the string may be in PROGMEM, so copy it to RAM for printf
  char s1[64];
  strncpy_P(s1, string, sizeof(s1));
  s1[sizeof(s1)-1]=0;
  Serial.printf("STATUS(%s) '%d' = '%s'\n", ptr, code, s1);
  Serial.flush();
}

AudioManager::AudioManager(){
    stream_url = "";
    streaming = false;
    volume = 100;
    audioLogger = &Serial;
    src = new AudioFileSourceICYStream();
    src->RegisterMetadataCB(MDCallback, (void*)"ICY");
    buff = new AudioFileSourceBuffer(src, AUDIO_BUFFERSIZE);
    buff->RegisterStatusCB(StatusCallback, (void*)"buffer");
    out = new AudioOutputI2S();
    out->SetPinout(I2S_BCLK_PIN, I2S_LRC_PIN, I2S_DOUT_PIN);
    out->SetBitsPerSample(AUDIO_BITSPERSAMPLE);
    out->SetChannels(AUDIO_CHANNELS);
    out->SetRate(AUDIO_SAMPLERATE);
    gen = new AudioGeneratorMP3();
    gen->RegisterStatusCB(StatusCallback, (void*)"mp3");
}

AudioManager* AudioManager::getInstance(){
    if(instance == nullptr){
        instance = new AudioManager();
    }
    return instance;
}

void AudioManager::setStreamUrl(String url){
    this->stream_url = url;
}

void AudioManager::stopStream(){
    Logger::add("stopping audio stream");
    streaming = false;
    if(gen->isRunning()){
        gen->stop();
    }
    if(src->isOpen()){
        src->close();
    }
}

void AudioManager::startStream(){
    Logger::add("start streaming audio from " + stream_url);
    stopStream();
    src->open(stream_url.c_str());
    gen->begin(buff, out);
    streaming = true;
}

String AudioManager::getStreamUrl(){
    return stream_url;
}

bool AudioManager::isPaused(){
    return !streaming;
}

void AudioManager::loop(){
    gen->loop();
}

void AudioManager::setVolume(int volume){
    if(volume >= 0 && volume <= 100){
        this->volume = volume;
        float gain = (float)volume/(float)100;
        Logger::add("setting gain to " + String(gain));
        out->SetGain(gain);
    }
}

int AudioManager::getVolume(){
    return volume;
}