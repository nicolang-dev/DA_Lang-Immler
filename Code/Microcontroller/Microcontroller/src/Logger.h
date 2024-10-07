#ifndef LOGGER_H
#define LOGGER_H
#include <Arduino.h>
#include <vector>

class Logger{
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

        /**
         * returns the size of the logs vecotor, as an unsigned long
         */
        static unsigned long getLogSize();

        /**
         * puts all log entrys from the vector in a string, seperated with commas
         */
        static String getLogsAsString();

        /**
         * reconverts a string with logs, seperated with commas to a log vector
         */
        static std::vector<String> getLogsFromString(String logs_str);

        /**
         * sets log vector to the given log vector
         */
        static void setLogs(std::vector<String> logs);
};
#endif