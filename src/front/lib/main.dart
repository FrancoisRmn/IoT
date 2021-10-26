import 'package:flutter/material.dart';
import 'package:front/pages/connect_alarm_clock.dart';
import 'package:front/pages/home_page.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MaterialApp(
    title: 'Connected Alarm Clock',
    theme: ThemeData(
      primarySwatch: Colors.blue,
    ),
    home: FutureBuilder(
      future: SharedPreferences.getInstance(),
      builder:
          (BuildContext context, AsyncSnapshot<SharedPreferences> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator();
        } else if (snapshot.connectionState == ConnectionState.done) {
          if (snapshot.hasError) {
            return const Text('Error');
          } else if (snapshot.hasData) {
            bool? isAlarmClockConnected =
                snapshot.data!.getBool("isAlarmClockConnected");
            if (isAlarmClockConnected == null) {
              return const ConnectAlarmClock();
            } else {
              return const HomePage();
            }
          } else {
            return const Text('Empty data');
          }
        } else {
          return Text('State: ${snapshot.connectionState}');
        }
      },
    ),
  ));
}
