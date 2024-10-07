#ifndef LOG_H
#define LOG_H
#include <Arduino.h>
#include <vector>

class Log{
    private:
        /**
         * vector, in which the logs are written as a String
         */
        static std::vector<String> logs;

    public:
        /**
         * adds a log entry to the logs vector
         */
        static void add(String log_entry);

        /**
         * returns the vector of all logs
         */
        static std::vector<String> getLogs();

        /**
         * returns the last log of the logs vector
         */
        static String getLastLog();
};
#endif