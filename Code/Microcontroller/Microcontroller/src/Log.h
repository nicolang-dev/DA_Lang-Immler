#ifndef LOG_H
#define LOG_H
#include <Arduino.h>
#include <vector>

class Log{
    private:
        static std::vector<String> logs;
        static unsigned int last_size;

    public:
        static void initialize();

        static void add(String log_entry);

        static std::vector<String> getLogs();

        static String getLastLog();

        static bool hasChanged();
};
#endif