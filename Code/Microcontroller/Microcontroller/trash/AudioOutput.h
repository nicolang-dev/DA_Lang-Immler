#ifndef AUDIOOUTPUT_H
#define AUDIOOUPUT_H

#include <Arduino.h>
#include <I2S.h>
#include "constants.h"

class AudioOutput{
    private:
        AudioOutput();
        ~AudioOutput();
    public:
        void initialize();
        void sendToDac(int *buffer);
};
#endif