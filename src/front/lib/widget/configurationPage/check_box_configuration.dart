import 'package:flutter/material.dart';
import 'package:front/model/wake_up_configuration.dart';

class CheckBoxConfiguration extends StatefulWidget {
  String title;
  ValueNotifier<WakeUpConfiguration> valueNotifier;
  CheckBoxConfiguration(
      {Key? key, required this.valueNotifier, required this.title})
      : super(key: key);

  @override
  _CheckBoxConfigurationState createState() => _CheckBoxConfigurationState();
}

class _CheckBoxConfigurationState extends State<CheckBoxConfiguration> {
  @override
  Widget build(BuildContext context) {
    return CheckboxListTile(
        title: Text(widget.title),
        value: widget.valueNotifier.value.preferHomeWorking,
        onChanged: (value) {
          setState(() {
            widget.valueNotifier.value.preferHomeWorking = value;
          });
        });
  }
}
