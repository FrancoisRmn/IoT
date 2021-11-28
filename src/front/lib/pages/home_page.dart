import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:front/data/api.dart';
import 'package:front/model/wake_up_response.dart';
import 'package:front/widget/appbar.dart';
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
      appBar: const Appbar(hasAction: true,),
      backgroundColor: Theme.of(context).backgroundColor,
      body: SafeArea(
        child: FutureBuilder(
          future: fetchWakeUpReason(),
          builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
            if (snapshot.connectionState == ConnectionState.done) {
              if (snapshot.hasError) {
                return Text(snapshot.error.toString());
              } else {
                WakeUpResponse wakeUpReason = snapshot.data;
                return ListView(
                  children: [
                    WakeUpTime(wakeUpReason.formatSeconds()),
                    WakeUpReasons(wakeUpResponse: wakeUpReason,),
                  ],
                );
              }
            } else {
              return const CircularProgressIndicator();
            }
          },
        ),
      ),
    );
  }
}
