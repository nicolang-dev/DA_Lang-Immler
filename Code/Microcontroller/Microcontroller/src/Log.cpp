#ifndef LOG_H
#define LOG_H
#include <Arduino.h>
#include <vector>

class Log{
    private:
        static String log_str;
        static unsigned int last_log_length;

    public:
        static void initialize(){
            log_str = "";
            last_log_length = 0;
        }

        static void add(String log_entry){
            log_str += log_entry;
            log_str += "\n";
        }

        static String getLogs(){
            last_log_length = log_str.length();
            return log_str;
        }

        static bool hasChanged(){
            return log_str.length() != last_log_length;
        }
};
#endif