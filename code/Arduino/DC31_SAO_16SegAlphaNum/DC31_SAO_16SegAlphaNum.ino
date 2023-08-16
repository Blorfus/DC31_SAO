#include <Adafruit_MCP23X08.h>
#include <Adafruit_MCP23X17.h>
#include <Adafruit_MCP23XXX.h>
#include "Letters.h"

#include <Wire.h>
#include "Adafruit_BusIO_Register.h"

//Mapping the pin names to the actual numbers
#define GPA0  0
#define GPA1  1
#define GPA2  2
#define GPA3  3
#define GPA4  4
#define GPA5  5
#define GPA6  6
#define GPA7  7
#define GPB0  8
#define GPB1  9
#define GPB2  10
#define GPB3  11
#define GPB4  12
#define GPB5  13
#define GPB6  14
#define GPB7  15

#define disp_1  GPA0
#define disp_2  GPA1
#define disp_3  GPA2
#define disp_4  GPA3
#define disp_5  GPA4
#define disp_6  GPA5
#define disp_7  GPA6
#define disp_8  GPA7
#define disp_9  GPB0
#define disp_10  GPB1
#define disp_11  GPB2
#define disp_12  GPB3
#define disp_13 GPB4
#define disp_14  GPB5
#define disp_15  GPB6
#define disp_16  GPB7

#define MCPAddr 0x20

#define DIG1_high   15
#define DIG1_low    0
#define DIG2_high   14
#define DIG2_low    1
#define DIG3_high   10
#define DIG3_low    9
#define DIG4_high   7
#define DIG4_low    8

#define SEG_A   0
#define SEG_B   1
#define SEG_C   2
#define SEG_D   3
#define SEG_E   4
#define SEG_F   5
#define SEG_G1  6
#define SEG_G2  7
#define SEG_H   8
#define SEG_J   9
#define SEG_K   10
#define SEG_L   11
#define SEG_M   12
#define SEG_N   13

int display_counter=0;
int word_changeTime=10;
int word1 = word_changeTime;
int word2 = word_changeTime*2;
int word3 = word_changeTime*3;
int word4 = word_changeTime*4;
int word5 = word_changeTime*5;
int digitCtr=1;
int delay_ms=250;
//uint8 tmp;

Adafruit_MCP23X17 mcp;

//The Active channel is marked as 0 since it sinks
word segments[]= {
    0b0001100000111100,
    0b0010100000111100,
    0b0011100000110100,
    0b0011100000111000,
    0b0011100000011100,
    0b0011000000111100,
    0b0011100000101100,
    0b0001100000111100,
    0b0010100000111100,
    0b0011100000110100,
    0b0011100000111000,
    0b0011100000011100,
    0b0011000000111100,
    0b0011100000101100
    };

word h_high = segments[SEG_E]&segments[SEG_F]&segments[SEG_G1]&segments[SEG_C];
word h_low = segments[SEG_G2];

word a_high = segments[SEG_E]&segments[SEG_F]&segments[SEG_G1]&segments[SEG_C]&segments[SEG_B]&segments[SEG_A];
word a_low = segments[SEG_G2];

word c_high = segments[SEG_E]&segments[SEG_F]&segments[SEG_A]&segments[SEG_D];
word c_low = segments[SEG_G2]|segments[SEG_H]|segments[SEG_J]|segments[SEG_K]|segments[SEG_N]|segments[SEG_M]|segments[SEG_L];

word k_high = segments[SEG_G1]|segments[SEG_A]|segments[SEG_B]|segments[SEG_C]|segments[SEG_D]|segments[SEG_E]|segments[SEG_F];
word k_low = segments[SEG_J]&segments[SEG_M]&segments[SEG_K]&segments[SEG_L];

word t_high = segments[SEG_A];
word t_low = segments[SEG_J]&segments[SEG_M];

word e_high = segments[SEG_A]&segments[SEG_F]&segments[SEG_D]&segments[SEG_E]&segments[SEG_G1];
word e_low = segments[SEG_G2]|segments[SEG_H]|segments[SEG_J]|segments[SEG_K]|segments[SEG_N]|segments[SEG_M]|segments[SEG_L];

word p_high = segments[SEG_E]&segments[SEG_F]&segments[SEG_A]&segments[SEG_B]&segments[SEG_G1];
word p_low = segments[SEG_G2];

word n_high = segments[SEG_E]&segments[SEG_F]&segments[SEG_B]&segments[SEG_C];
word n_low = segments[SEG_H]&segments[SEG_L];

word l_high = segments[SEG_E]&segments[SEG_F]&segments[SEG_D];
word l_low = segments[SEG_G2]|segments[SEG_H]|segments[SEG_J]|segments[SEG_K]|segments[SEG_N]|segments[SEG_M]|segments[SEG_L];

void setup() {
  Serial.begin(115200);
  Wire.begin(5, 4);
  //Wire.begin();
  if (!mcp.begin_I2C()) {
    Serial.println("Error on I2c startup");
    while (1);
    }
   mcp.pinMode(disp_16, OUTPUT);
   mcp.pinMode(disp_1, OUTPUT);
   mcp.pinMode(disp_15, OUTPUT);
   mcp.pinMode(disp_2, OUTPUT);
   mcp.pinMode(disp_7, OUTPUT);
   mcp.pinMode(disp_11, OUTPUT);
   mcp.pinMode(disp_10, OUTPUT);
   mcp.pinMode(disp_8, OUTPUT);
   mcp.pinMode(disp_9, OUTPUT);

   mcp.pinMode(disp_14, OUTPUT);
   mcp.pinMode(disp_13, OUTPUT);
   mcp.pinMode(disp_4, OUTPUT);
   mcp.pinMode(disp_3, OUTPUT);
   mcp.pinMode(disp_6, OUTPUT);
   mcp.pinMode(disp_12, OUTPUT);
   mcp.pinMode(disp_5, OUTPUT);

  //Turn all the inputs off, aka blank screen
   allDigitsOff();
   mcp.digitalWrite(disp_7, LOW);
}



void loop() {

  //SetSymbol(0, 0b0000101111000000);
 // SetSymbol(1, 0b0000101111000110);
  //delayMicroseconds(10);
 // Serial.println("clearing");
  //SetSymbol(1, 0b0000000000000000); 
  delay(10);
  //test(10);
  display_counter++;
  if(display_counter <= word1){
      showLetter(1, h_high, h_low, 1);
      showLetter(2, a_high, a_low, 1);
      showLetter(3, c_high, c_low, 1);
      showLetter(4, k_high, k_low, 1);
      }
   else if((display_counter > word1) && (display_counter <= word2)){
      showLetter(1, t_high, t_low, 1);
      showLetter(2, h_high, h_low, 1);
      showLetter(3, e_high, e_low, 1);
      }
   else if((display_counter > word2)&&(display_counter <= word3)){
      showLetter(1, p_high, p_low, 1);
      showLetter(2, l_high, l_low, 1);
      showLetter(3, a_high, a_low, 1);
      showLetter(4, n_high, n_low, 1);
      }
   else if((display_counter > word3)&&(display_counter <= word4)){
      showLetter(1, a_high, a_low, 1);
      showLetter(2, n_high, n_low, 1);
      showLetter(3, e_high, e_low, 1);
      showLetter(4, t_high, t_low, 1);
      }
   else{
      display_counter=0;
        }

}


void showLetter(int digit, word highVal, word lowVal, int t){
  word out;
  int digHigh =0;
  int digLow = 0;
  switch(digit){
    case 1:
      digHigh = DIG1_high;
      digLow = DIG1_low;
      break;
    case 2:
      digHigh = DIG2_high;
      digLow = DIG2_low;
      break;
    case 3:
      digHigh = DIG3_high;
      digLow = DIG3_low;
      break;
    case 4:
      digHigh = DIG4_high;
      digLow = DIG4_low;
      break;
      }

  out=highVal;
  bitSet(out, digHigh);
  mcp.writeGPIOAB(out);
  delay(t);
  out=lowVal;
  bitSet(out, digLow);
  mcp.writeGPIOAB(out);
  delay(t);
}

void printGPIOState(int state){
  word tmp=mcp.readGPIO();
  Serial.println("Loop:"+String(state)+"["+String(tmp)+"]");
  }

void test(int t){
  word out=0;
  for(int i=0; i<14; i++){
    if(i<7){
      out = segments[i];
      bitSet(out, DIG1_high);
      }
    else{
      out = segments[i];
      bitSet(out, DIG1_low);
      }
    Serial.print("["+String(i)+"]"+String(out)+": ");
    Serial.println(out, BIN);
   // delayMicroseconds(10000);
    delay(t);
    mcp.writeGPIOAB(out);
    }
  
}


void Colon(bool state){  //hehehehe
    if(state){
        //Set 7 HIGH D1, D2 LOW
        mcp.digitalWrite(disp_11, LOW);
        mcp.digitalWrite(disp_7, HIGH);
        mcp.digitalWrite(disp_14, LOW);
        }
    else{
        //Set 7 LOW, D1 D2 Don't care
        mcp.digitalWrite(disp_7, LOW);
        mcp.digitalWrite(disp_14, HIGH);
        }
}

void Dot(bool state){
    if(state){
        //Set 7 HIGH 13 LOW
        mcp.digitalWrite(disp_7, HIGH);
        mcp.digitalWrite(disp_13, LOW);
        }
    else{
        //Set 7 LOW, 13 Don't care
        mcp.digitalWrite(disp_7, LOW);
        mcp.digitalWrite(disp_13, HIGH);
        }
  }

void allDigitsOff(){ //Disables all digits
  mcp.digitalWrite(disp_16, LOW);
  mcp.digitalWrite(disp_1, LOW);
  mcp.digitalWrite(disp_15, LOW);
  mcp.digitalWrite(disp_2, LOW);
  mcp.digitalWrite(disp_11, LOW);
  mcp.digitalWrite(disp_10, LOW);
  mcp.digitalWrite(disp_8, LOW);
  mcp.digitalWrite(disp_9, LOW);
}
