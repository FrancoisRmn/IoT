import 'package:flutter/material.dart';
import 'package:front/model/wake_up_configuration.dart';
import 'package:front/resource/globals.dart';

class CheckBoxConfiguration extends StatefulWidget {
  final String title;
  const CheckBoxConfiguration({Key? key, required this.title})
      : super(key: key);

  @override
  _CheckBoxConfigurationState createState() => _CheckBoxConfigurationState();
}

class _CheckBoxConfigurationState extends State<CheckBoxConfiguration> {
  @override
  Widget build(BuildContext context) {
    return CheckboxListTile(
        title: Text(widget.title),
        value: config!.preferHomeWorking,
        onChanged: (value) {
          setState(() {
            config!.preferHomeWorking = value;
          });
        });
  }
}
