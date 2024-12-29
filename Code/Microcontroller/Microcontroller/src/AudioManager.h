#ifndef AUDIOMANAGER_H
#define AUDIOMANAGER_H

#include <Arduino.h>
#include <Audio.h>
#include "constants.h"

class AudioManager{
    private:
        static AudioManager* instance;
        Audio audio;
        bool streaming;
        String stream_url;

        AudioManager();
        ~AudioManager();

    public:
        static AudioManager* getInstance();
        /**
         * initializes the I2S-pins and sets the volume to the default volume
         */
        bool initialize();

        /**
         * starts to receive the audio stream from the given url
         * @param url URL of the audio stream, which should be received
         */
        bool startStream(String url);

        /**
        * returns the stream url
        */
        String getStreamUrl();

        /**
         * stops to receive the audio stream
         */
        bool pauseStream();

        /**
         * continues the audio stream, if it's paused
         */
        bool continueStream();

        /**
         * returns if the audio stream paused
         */
        bool isPaused();

        /**
         * handles the audio process
         */
        void loop();

        /**
         * sets the volume of the output
         */
        void setVolume(int volume);

        /**
         * returns the volume set
         */
        int getVolume();
};
#endif