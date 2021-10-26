#include <WiFi101.h>
#include <SPI.h>
#include <Seeed_HM330X.h>     // Library use to connect the PM2.5 sensor
#include <WebSocketsClient.h> // Library use to allow websockets

// WiFi informations
char ssid[] = "VOO-006536";   // The name of the network
char pass[] = "HKEHHZUN";     // The network password
int status = WL_IDLE_STATUS;  // The WiFi radio's status
IPAddress ip(192, 168, 0, 126);  // Set an fixed ip for the Arduino

// PM2.5 sensor informations
HM330X sensor;
uint8_t buf[30];
const char* str[] = {"sensor num: ", "PM1.0 concentration(CF=1,Standard particulate matter,unit:ug/m3): ",
                     "PM2.5 concentration(CF=1,Standard particulate matter,unit:ug/m3): ",
                     "PM10 concentration(CF=1,Standard particulate matter,unit:ug/m3): ",
                     "PM1.0 concentration(Atmospheric environment,unit:ug/m3): ",
                     "PM2.5 concentration(Atmospheric environment,unit:ug/m3): ",
                     "PM10 concentration(Atmospheric environment,unit:ug/m3): ",
                    };

// Web socket informations
WebSocketsClient webSocket;

void setup() {
  // Set a delay before launching the programm to avoid crash
  delay(5000);
  
  /*===== Initialize the Serial connection =====*/
  // Intialize serial and wait fort port to open : 
  Serial.begin(9600);
  while (!Serial) {} // Wait for serial port to connect

  // Check for the presence of the shield :
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("Wifi shield not present");
    while (true);   // don't continue :
  }

  /*===== Initialize the WiFi =====*/
  int count = 0;
  WiFi.config(ip);
  do {
    count++;
    // Attempt to connect to a network
    Serial.println("Attempting to connect to WPA network...");
    status = WiFi.begin(ssid, pass);
    delay(1000);
  } while(status != WL_CONNECTED && count < 5);

  // If you are not connected, stop here
  if (status != WL_CONNECTED) {
    Serial.println("Couldn't get a wifi connection");
    while(true);
  } else { // If you are connected, print out info about connection :
    Serial.println("Connected to network");
    Serial.print("IP Address : ");
    IPAddress ipaa = WiFi.localIP();
    Serial.println(ipaa);
  }

  /*===== Connect the PM2.5 sensor =====*/
  Serial.println("Start init sensor");
  if (sensor.init()){
    Serial.println("HM3301 init failed !!!");
    while (true);
  }

  webSocket.begin("192.168.0.126", 8011);
  webSocket.onEvent(webSocketEvent);

  webSocket.loop();
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch(type){
    case WStype_DISCONNECTED:
      Serial.println("[WSc] Disconnected !");
      break;
    case WStype_CONNECTED:
      {
        Serial.print("[WSc] Connected to url : ");
        Serial.println((char *)payload);
        // Send message to server when connected
        webSocket.sendTXT("CONNECTED");
      }
      break;
    case WStype_TEXT:
       Serial.print("[WSc] get text: ");
       Serial.println((char *)payload);
       // send message to server
       // webSocket.sendTXT("message here");
       break;
     case WStype_BIN:
       Serial.print("[WSc] get binary length: ");
       Serial.println(length);
       // hexdump(payload, length);
       // send data to server
       // webSocket.sendBIN(payload, length);
       break;
  }
}

HM330XErrorCode print_result(const char* str, uint16_t value) {
  if (NULL == str) {
    return ERROR_PARAM;
  }
  Serial.print(str);
  Serial.println(value);
  return NO_ERROR;
}

/*parse buf with 29 uint8_t-data*/
HM330XErrorCode parse_result(uint8_t* data) {
  uint16_t value = 0;
  if (NULL == data) {
    return ERROR_PARAM;
  }
  for (int i = 1; i < 8; i++) {
    value = (uint16_t) data[i * 2] << 8 | data[i * 2 + 1];
    print_result(str[i - 1], value);
  }
  return NO_ERROR;
}

HM330XErrorCode parse_result_value(uint8_t* data) {
  if (NULL == data) {
    return ERROR_PARAM;
  }
  for (int i = 0; i < 28; i++) {
    Serial.print(data[i], HEX);
    Serial.print("  ");
    if ((0 == (i) % 5) || (0 == i)) {
      Serial.println("");
    }
  }
  uint8_t sum = 0;
  for (int i = 0; i < 28; i++) {
    sum += data[i];
  }
  if (sum != data[28]) {
    Serial.println("wrong checkSum!!!!");
  }
  Serial.println("");
  return NO_ERROR;
}

void loop() {
  // put your main code here, to run repeatedly:
  delay(10000);

  if (sensor.read_sensor_value(buf, 29)){
    Serial.println("HM3301 read result failed !!!");
  }
  //parse_result_value(buf);
  parse_result(buf);
  Serial.println("");
 

}
