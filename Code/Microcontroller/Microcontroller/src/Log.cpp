#include "Log.h"

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
