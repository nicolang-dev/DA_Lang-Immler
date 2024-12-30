#ifndef AUDIOMANAGER_H
#define AUDIOMANAGER_H

#include <Arduino.h>
#include "constants.h"
#include "AudioFileSourceICYStream.h"
#include "AudioFileSourceBuffer.h"
#include "AudioGeneratorMP3.h"
#include "AudioOutputI2S.h"

class AudioManager{
    private:
        static AudioManager* instance;
        AudioGeneratorMP3 *gen;
        AudioFileSourceICYStream *src;
        AudioFileSourceBuffer *buff;
        AudioOutputI2S *out;
        bool streaming;
        String stream_url;
        int volume;

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
         * @param volume the desired volume, in the range between 0 an 100
         */
        void setVolume(int volume);

        /**
         * returns the volume, which is currently set
         */
        int getVolume();
};
#endif