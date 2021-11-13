import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:front/resource/theme.dart';
import 'package:front/widget/appbar.dart';
import 'package:front/widget/container_wake_up_detail.dart';
import 'package:front/widget/container_wake_up_reasons.dart';
import 'package:front/widget/container_wake_up_time.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const Appbar(),
      backgroundColor: WakeUpTheme.appTheme.backgroundColor,
      body: SafeArea(
        child: ListView(
          children: const [
            WakeUpTime(),
            WakeUpReasons(),
            WakeUpDetail(),
          ],
        ),
      ),
    );
  }
}
