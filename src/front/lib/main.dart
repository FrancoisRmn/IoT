import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:front/pages/connect_alarm_clock_page.dart';
import 'package:front/pages/home_page.dart';
import 'package:front/resource/constants.dart';
import 'package:front/resource/theme.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle(statusBarColor: WakeUpTheme.appTheme.primaryColor));
  runApp(const App());
}

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Connected Alarm Clock',
      theme: WakeUpTheme.appTheme,
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
                  snapshot.data!.getBool(IS_RASPBERRY_CONNECTED);
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
    );
  }
}
