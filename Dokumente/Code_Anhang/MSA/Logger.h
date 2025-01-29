#ifndef LOGGER_H
#define LOGGER_H
#include <Arduino.h>
#include <vector>
#include <ArduinoJson.h>

class Logger{
    private:
        /**
         * vector, in which the logs are written as a String
         */
        static std::vector<std::tuple<String, unsigned long>> logs;

    public:
        /**
         * adds a log entry to the logs vector
         */
        static void add(String log_entry);

        /**
         * returns the vector of all logs
         */
        static std::vector<std::tuple<String,unsigned long>> getLogs();

        /**
         * returns the last log of the logs vector
         */
        static std::tuple<String, unsigned long> getLastLog();

        /**
         * returns the size of the logs vecotor, as an unsigned long
         */
        static unsigned long getLogSize();

        /**
         * returns the logs as a serialized json
         */
        static String getLogsAsJSON();

        /**
         * reconverts a string with logs, seperated with commas to a log vector
         */
        static std::vector<String> getLogsFromString(String logs_str);

        /**
         * sets log vector to the given log vector
         */
        static void setLogs(std::vector<std::tuple<String,unsigned long>> logs);

        /**
         * clears the vector
         */
        static void clearLogs();
};
#endif