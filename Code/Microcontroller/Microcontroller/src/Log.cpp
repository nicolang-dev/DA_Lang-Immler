#ifndef LOG_H
#define LOG_H
#include <Arduino.h>
#include <vector>

class Log{
    private:
        std::vector<String> log_list;

    public:
        void add(String log){
            unsigned long time = millis();
            String log_entry = String(time) + log;
            log_list.push_back(log_entry);
        }

        String getAllLogs(){
            String result;
            for(int i = 0; i < log_list.size(); i++){
                result += log_list[i] + "\n";
                return result;
            }
        }

        void clearLogList(){
            log_list.clear();
            log_list.shrink_to_fit();
        }
}

#endif