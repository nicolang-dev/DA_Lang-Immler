#include "Logger.h"

std::vector<String> Logger::logs;

void Logger::add(String log_entry){
    Logger::logs.push_back(log_entry);
}

std::vector<String> Logger::getLogs(){
    return logs;
}

String Logger::getLastLog(){
    return logs.at(logs.size()-1);
}

unsigned long Logger::getLogSize(){
    return logs.size();
}

String Logger::getLogsAsString(){
    String log_str = "";
    if(logs.size() > 0){
        for(int i = 0; i < logs.size(); i++){
            log_str += logs.at(i);
            log_str += ",";
        }
    }
    return log_str;
}

std::vector<String> Logger::getLogsFromString(String logs_str){
    //empty
}

void Logger::setLogs(std::vector<String> logs){
    Logger::logs = logs;
}