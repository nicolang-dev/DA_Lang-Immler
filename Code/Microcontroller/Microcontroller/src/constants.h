/**
 * file with constants, which are needed in the code
 */

#ifndef CONSTANTS_H
#define CONSTANTS_H

#include "Arduino.h"

//pins
const int I2S_BCLK_PIN = 26; //27
const int I2S_LRC_PIN = 25; //26
const int I2S_DOUT_PIN = 22; //25

const int BUTTON_PIN = 12;
const int LED_RED = 15;
const int LED_GREEN = 2;
const int LED_BLUE = 4;
const int BATTERY_PIN = 35;

//network
const IPAddress AP_LOCAL_IP(192,168,0,1);
const IPAddress AP_GATEWAY_IP(192,168,0,1);
const IPAddress AP_SUBNET_IP(255,255,255,0);
//const String AP_SSID = "Microcontroller";
const int MAX_RECONNECTION_TRIES = 2;
const unsigned long MAX_CONNECTION_TIME = 5000;

//memory
const String MEMORY_NAMESPACE = "variables";

const String SSID_KEY = "ssid";
const String PASSWORD_KEY = "password";
const String URL_KEY = "wifi";
const String LOGS_KEY = "logs";
const String NAME_KEY = "name";
const String IP_KEY = "ip";

//audio
const int AUDIO_BUFFERSIZE = 32768;
const int AUDIO_BITSPERSAMPLE = 16;
const int AUDIO_SAMPLERATE = 44100;
const int AUDIO_CHANNELS = 2;

//button
const int BUTTON_CONFIG_DURATION = 3000; //time for which the button has to be pressed, that config mode is activated

//other constants
const unsigned long SERIAL_BAUDRATE = 9600;
const int BUTTON_PRESS_SLEEP_TIME = 2000;
const unsigned long WLAN_REQUEST_PERIOD = 10000;
const int AUDIO_VOLUME = 10; //0-21
const int SERVER_PORT = 8080;
//const String DEFAULT_NAME = "MSA";
const String TIME_URL = "http://worldtimeapi.org/api/ip";
const int DEFAULT_VOLUME = 10;
#endif