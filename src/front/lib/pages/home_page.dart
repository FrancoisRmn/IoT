import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:front/data/api.dart';
import 'package:front/model/wake_up_response.dart';
import 'package:front/widget/appbar.dart';
import 'package:front/widget/homePage/container_wake_up_reasons.dart';
import 'package:front/widget/homePage/container_wake_up_time.dart';
import 'package:front/widget/homePage/decoration_wake_up_container.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  refresh() {
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Appbar(
        hasConfigurationAction: true,
        notifyParent: refresh,
      ),
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
                    WakeUpTime(
                        wakeUpReason.time != null ? wakeUpReason.time! : ""),
                    Padding(
                      padding: const EdgeInsets.fromLTRB(8, 0, 8, 8),
                      child: Container(
                        child: Center(
                            child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            wakeUpReason.isHomeWorking
                                ? "You work at home today"
                                : "You work at the office today",
                            style: Theme.of(context).textTheme.headline2,
                            textAlign: TextAlign.center,
                          ),
                        )),
                        decoration: WakeUpContainerDecoration()
                            .create(context, Theme.of(context).primaryColor),
                      ),
                    ),
                    WakeUpReasons(
                      wakeUpResponse: wakeUpReason,
                    ),
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
