import 'package:flutter/material.dart';

const double TEXTFONTSIZE = 15;
const double TITLEFONTSIZE = 18;

class WakeUpTheme {
  static ThemeData appTheme = ThemeData(
    textTheme: const TextTheme(
        headline1: TextStyle(
            fontSize: 150.0, color: Colors.white, fontWeight: FontWeight.bold),
        headline5: TextStyle(fontSize: 20, color: Color(0xFF00BCB8))),
    primaryColorBrightness: Brightness.dark,
    primaryColor: Color(0xFF00BCB8),
    backgroundColor: Colors.white,
    brightness: Brightness.light,
    dividerColor: Color(0xFFE2E2E5),
    primaryColorDark: Color(0xFFD5D5D5),
    fontFamily: 'Roboto-Regular',
  );
}
