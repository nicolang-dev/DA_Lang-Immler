#include "AudioManager.h"

AudioManager* AudioManager::instance = nullptr;

AudioManager::AudioManager(){
    stream_url = "";
    streaming = false;
}

AudioManager* AudioManager::getInstance(){
    if(instance == nullptr){
        instance = new AudioManager();
    }
    return instance;
}

bool AudioManager::initialize(){
    audio.setVolume(DEFAULT_VOLUME);
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

String AudioManager::getStreamUrl(){
    return stream_url;
}

bool AudioManager::pauseStream(){
    streaming = false;
    return true;
} 


bool AudioManager::continueStream(){
    streaming = true;
    return true;
} 

bool AudioManager::isPaused(){
    return streaming;
}

void AudioManager::loop(){
    audio.loop();
}

int AudioManager::getVolume(){
    return audio.getVolume();
}

void AudioManager::setVolume(int volume){
    audio.setVolume(volume);
}