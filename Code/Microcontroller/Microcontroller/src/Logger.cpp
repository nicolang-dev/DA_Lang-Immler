#include "Logger.h"

std::vector<std::tuple<String,unsigned long>> Logger::logs;

void Logger::add(String log_entry, unsigned long time){
    Serial.println(log_entry); //for debug purposes
    Logger::logs.push_back(std::make_tuple(log_entry, time));
}

std::vector<std::tuple<String,unsigned long>> Logger::getLogs(){
    return logs;
}

String Logger::getLogsAsJSON(){
    JsonDocument doc;
    for(int i = 0; i < logs.size(); i++){
        doc[i]["ssid"] = std::get<0>(logs.at(i));
        doc[i]["ssid"] = std::get<1>(logs.at(i));
    }
    String logs_str;
    serializeJson(doc, logs_str);
    return logs_str;
}

std::tuple<String, unsigned long> Logger::getLastLog(){
    int log_size = getLogSize();
    return logs.at(log_size);
}

unsigned long Logger::getLogSize(){
    return logs.size();
}

std::vector<String> Logger::getLogsFromString(String logs_str){
    //empty
}

void Logger::setLogs(std::vector<std::tuple<String,unsigned long>> logs){
    Logger::logs = logs;
}