#include "Name.h"

String macAddr = NetworkManager::getInstance()->getMac();
String adapterName = "maa_" + macAddr.substring(9,11) + macAddr.substring(12,14) + macAddr.substring(15,17);