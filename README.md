# DC31_SAO - SEGoSaurus

![V1 Prototype Board](/pics/DC31_Prototype.png)

This repo is for a custom SAO to fit the Defcon31 badge. Unfortunately, the actual SAO was never fully produced before DC31 due to timing and production issues. As a result I had the only functional prototype. The goal was to have an double board SAO with ESP12F and 14 segment Alphanumeric display that would display Wifi SSIDs OR a customized message.

Just because things weren't ready for DC31 doesn't mean it's the end of this project, it will continue and (hopefully) be ready or at least the basis for DC32.

## Intraboard Connector

The v1 prototype boards include a 4pin connector with 1.0 mm spacing. This was smaller than I had originally intended and future revisions will have 2.54mm spacing. They can still be used with some very small guaged(30ga) solid core wire. With the narrow side pointed down, the pinout of the board is as follows:

1. GND
2. VCC (3.3V/5V)
3. SCL/SCK  (I2c Clock)
4. SDA (I2c Data)

Because this is conector is effectively just an I2C breakout, any microcontroller can be used with just the display board.
![V1 Display PCB](/pics/displayBoard.png)

## Display Board

The v1 prototype boards use a very simple circuit with just the 14-segment and an MCP23017 digital I/O expander. This IC allows us to drive and sink each pin in a dynamic fashion. The catch is that due to the pinout of the display a single sink pin and two source pins can drive two different segments. e.g. if we have sink pin 14 pulled down then pin 16 sourcing voltage, sourcing voltage on pin1 would result in two different segments on the same digit lit up. While this can be useful in some cases it generally would cause odd characters to show up.

The JMF-4473BP3-59P6.8 display is included on the v1 prototype boards. This display is available from Sparkfun here: https://www.sparkfun.com/products/21213

## The Code

Since the prototype was built on an ESP8266 Huzzah board the Arudino environment was used. It is likely that future versions will also use the Arudino environment.

The code uses 32-bit values to drive each of the segments on or off depending on the character chosen. When fed to the display routine, the code will take the highest 16 bits and write it out to the MCP chip, wait a millisecond and then write out the lower 16 bits to the MCP. It will repeat this sequence for all 4 digits as needed. The different digits are activated by using binary masking.

Each 32-bit value represents each of the 16-bit values for the MCP, so effectively it's direct pin control of each of the display's pins. We divide it up into 16 bit segments for two reasons, firstly, the MCP23017 only has 16 outputs, secondly because of the shared pins of the display we want to split out each digit into high and low values.

## Libraries

This project uses the following libraries:

* Adafruit MCP23017 Arduino Library
This library can be obtained here: https://github.com/adafruit/Adafruit-MCP23017-Arduino-Library or through the integrated Arduino Libraries manager. There are a few dependencies that the Libraries Boards Manager will auto install for you, so this is the reccomended method if you're lazy like me.


## Future Updates

* Better Labels on PCB
* HTML Based Character creator utility
* Code Cleanup
* Scrolling Funciton
* Replace CH340N with CP1202 or similar
* Possibly use USB-C instead of USB-A
* Fix board size
