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
    audio.connecttohost(url.c_str());
}

bool AudioManager::isStreaming(){
    return audio.isRunning();
}

void AudioManager::loop(){
    audio.loop();
}