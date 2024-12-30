#include "AudioManager.h"

AudioManager* AudioManager::instance = nullptr;

AudioManager::AudioManager(){
    stream_url = "";
    streaming = false;
    volume = 100;
    audioLogger = &Serial;
    //src->RegisterMetadataCB(MDCallback, (void*)"ICY");
    buff = new AudioFileSourceBuffer(src, AUDIO_BUFFERSIZE);
    //buff->RegisterStatusCB(StatusCallback, (void*)"buffer");
    out = new AudioOutputI2S();
    out->SetPinout(I2S_BCLK_PIN, I2S_LRC_PIN, I2S_DOUT_PIN);
    out->SetBitsPerSample(AUDIO_BITSPERSAMPLE);
    out->SetChannels(AUDIO_CHANNELS);
    out->SetRate(AUDIO_SAMPLERATE);
    gen = new AudioGeneratorMP3();
    //gen->RegisterStatusCB(StatusCallback, (void*)"mp3");
}

AudioManager* AudioManager::getInstance(){
    if(instance == nullptr){
        instance = new AudioManager();
    }
    return instance;
}

bool AudioManager::startStream(String url){
    stream_url = url;
    src = new AudioFileSourceICYStream(stream_url.c_str());
    gen->begin(buff, out);
    return true;
}

String AudioManager::getStreamUrl(){
    return stream_url;
}

bool AudioManager::pauseStream(){
    streaming = false;
    gen->stop();
    return true;
} 


bool AudioManager::continueStream(){
    streaming = true;
    gen->begin(buff, out);
    return true;
} 

bool AudioManager::isPaused(){
    return streaming;
}

void AudioManager::loop(){
    gen->loop();
}

void AudioManager::setVolume(int volume){
    if(volume >= 0 && volume <= 100){
        this->volume = volume;
        float gain = volume/100;
        out->SetGain(gain);
    }
}

int AudioManager::getVolume(){
    return volume;
}