#ifndef AUDIOMANAGER_H
#define AUDIOMANAGER_H

#include <Arduino.h>
#include <Audio.h>
#include "constants.h"

class AudioManager{
    private:
        static AudioManager* instance;
        Audio audio;

    public:
        static AudioManager* getInstance();
        /**
         * initializes the I2S-pins and sets the volume
         * @param volume volume in percent (0-100);
         */
        bool initialize(int volume);

        /**
         * starts to receive the audio stream from the given url
         * @param url URL of the audio stream, which should be received
         */
        bool startStream(String url);

        /**
         * stops to receive the audio stream
         */
        bool stopStream();

        /**
         * returns if the audio stream is beeing received
         */
        bool isStreaming();

        /**
         * handles the audio process
         */
        void loop();
};
#endif