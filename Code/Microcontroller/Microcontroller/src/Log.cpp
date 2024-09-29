#include "Log.h"

void Log::initialize(){
    log_str = "";
    last_log_length = 0;
}

void Log::add(String log_entry){
    log_str += log_entry;
    log_str += "\n";
}

String Log::getLogs(){
    last_log_length = log_str.length();
    return log_str;
}

bool Log::hasChanged(){
    return log_str.length() != last_log_length;
}
