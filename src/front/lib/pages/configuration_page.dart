import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:front/data/api.dart';
import 'package:front/resource/globals.dart';
import 'package:front/widget/appbar.dart';
import 'package:front/widget/configurationPage/check_box_configuration.dart';
import 'package:front/widget/configurationPage/home_working_widget.dart';
import 'package:front/widget/configurationPage/office_working_widget.dart';

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
            config = snapshot.data;
            print(config.toString());
            return Scaffold(
                appBar: const Appbar(
                  hasConfigurationAction: false,
                  notifyParent: null,
                ),
                backgroundColor: Colors.white,
                body: ListView(
                  children: const [
                    CheckBoxConfiguration(
                      title: "Do you prefer homeworking ?",
                    ),
                    HomeWorking(),
                    OfficeWorking()
                  ],
                ));
          } else {
            return const CircularProgressIndicator();
          }
        },
      ),
    );
  }
}
