import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:front/data/api.dart';
import 'package:front/model/wake_up_configuration.dart';
import 'package:front/widget/appbar.dart';
import 'package:front/widget/configurationPage/check_box_configuration.dart';

class ConfigurationPage extends StatefulWidget {
  const ConfigurationPage({Key? key}) : super(key: key);

  @override
  _ConfigurationPageState createState() => _ConfigurationPageState();
}

class _ConfigurationPageState extends State<ConfigurationPage> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: FutureBuilder(
        future: fetchWakeUpConfiguration(),
        builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            if (snapshot.hasError) {
              return Text(snapshot.error.toString());
            } else {
              WakeUpConfiguration wakeUpConfiguration = snapshot.data;
              ValueNotifier<WakeUpConfiguration> config =
                  ValueNotifier(wakeUpConfiguration);
              return ValueListenableBuilder<WakeUpConfiguration>(
                  valueListenable: config,
                  builder: (context, value, child) {
                    return Scaffold(
                        appBar: Appbar(
                          hasConfigurationAction: false,
                          wakeUpConfiguration: wakeUpConfiguration,
                        ),
                        backgroundColor: Theme.of(context).backgroundColor,
                        body: ListView(
                          children: [
                            CheckBoxConfiguration(
                              data: config.value.preferHomeWorking!,
                              title: "Do you prefer homeworking ?",
                              valueNotifier: config,
                            )
                          ],
                        ));
                  });
            }
          } else {
            return const CircularProgressIndicator();
          }
        },
      ),
    );
  }
}
