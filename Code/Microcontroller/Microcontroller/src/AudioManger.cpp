#include "AudioManager.h"

AudioManager* AudioManager::instance = nullptr;

AudioManager* AudioManager::getInstance(){
    if(instance == nullptr){
        instance = new AudioManager();
    }
    return instance;
}

bool AudioManager::initialize(int volume){
    audio.setVolume(volume);
    return audio.setPinout(I2S_BCLK_PIN, I2S_LRC_PIN, I2S_DOUT_PIN);
}

bool AudioManager::startStream(String url){
    stream_url = url;
    if(audio.connecttohost(url.c_str())){
        streaming = true;
        return true;
    }
    return false;
}

bool AudioManager::stopStream(){
    streaming = false;
    return true;
} 

bool AudioManager::isStreaming(){
    return streaming;
}

void AudioManager::loop(){
    audio.loop();
}

String AudioManager::getStreamUrl(){
    return stream_url;
}

void AudioManager::setVolume(int volume){
    audio.setVolume(volume);
}