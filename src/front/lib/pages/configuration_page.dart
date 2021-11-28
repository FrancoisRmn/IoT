import 'package:flutter/material.dart';
import 'package:front/data/api.dart';
import 'package:front/model/wake_up_configuration.dart';
import 'package:front/widget/appbar.dart';

class ConfigurationPage extends StatefulWidget {
  const ConfigurationPage({Key? key}) : super(key: key);

  @override
  _ConfigurationPageState createState() => _ConfigurationPageState();
}

class _ConfigurationPageState extends State<ConfigurationPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: const Appbar(hasAction: false,),
        backgroundColor: Theme.of(context).backgroundColor,
        body: SafeArea(
        child: FutureBuilder(
          future: fetchWakeUpConfiguration(),
          builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
            if (snapshot.connectionState == ConnectionState.done) {
              if (snapshot.hasError) {
                return Text(snapshot.error.toString());
              } else {
                WakeUpConfiguration wakeUpConfiguration = snapshot.data;
                return Container();
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
