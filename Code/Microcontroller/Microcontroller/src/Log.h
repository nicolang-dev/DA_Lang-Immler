#ifndef LOG_H
#define LOG_H
#include <Arduino.h>
#include <vector>

class Log{
    private:
        static String log_str;
        static unsigned int last_log_length;

    public:
        static void initialize();

        static void add(String log_entry);

        static String getLogs();

        static bool hasChanged();
};
#endif