#include "StreamManager.h"

StreamManager* StreamManager::instance = nullptr;

StreamManager::StreamManager(){
    //empty
}

StreamManager::~StreamManager(){
    //empty
}

StreamManager* StreamManager::getInstance(){
    if(instance == nullptr){
        instance = new StreamManager();
    }
    return instance;
}

void StreamManager::start(String url){
    http_client.begin(url);
    int resp_code = http_client.GET();
    if(resp_code == 302){
        String new_url = http_client.getLocation();
        http_client.end();
        http_client.begin(new_url);
        resp_code = http_client.GET();
    }
    if(resp_code == HTTP_CODE_OK){
        stream = http_client.getStreamPtr();
    }
}

bool StreamManager::dataAvailable(){
    return stream->available();
}

void StreamManager::writeDataInBuffer(uint16_t *buffer){

}

void StreamManager::stop(){
    http_client.end();
}