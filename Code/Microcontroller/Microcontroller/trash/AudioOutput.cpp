#include "AudioOutput.h"

AudioOutput::AudioOutput(){
    //empty
}

AudioOutput::~AudioOutput(){
    //empty
}

void AudioOutput::initialize(){
    //philips i2s mode, 44,1 kHz sample rate, 16 bits per sample
    I2S.begin(I2S_PHILIPS_MODE, 44100, 16);
    I2S.setSckPin(I2S_BCLK_PIN);
    I2S.setFsPin(I2S_LRC_PIN);
    I2S.setDataOutPin(I2S_DOUT_PIN);
}

void AudioOutput::sendToDac(int *buffer){
    //empty
}

