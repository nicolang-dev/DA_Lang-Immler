#include "Log.h"

unsigned int Log::last_size = 0;
std::vector<String> Log::logs;

void Log::add(String log_entry){
    Log::logs.push_back(log_entry);
}

std::vector<String> Log::getLogs(){
    return logs;
}

String Log::getLastLog(){
    return logs.at(logs.size()-1);
}

bool Log::hasChanged(){
    if(logs.size() > last_size){
        last_size = logs.size();;
        return true;
    }
    return false;
}
