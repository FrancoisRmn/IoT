import 'package:flutter/material.dart';
import 'package:front/model/wake_up_configuration.dart';
import 'package:front/resource/globals.dart';

class AgendaCheckWidget extends StatefulWidget {
  const AgendaCheckWidget({Key? key}) : super(key: key);

  @override
  _AgendaCheckWidgetState createState() => _AgendaCheckWidgetState();
}

class _AgendaCheckWidgetState extends State<AgendaCheckWidget> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: TextField(
        onChanged: (String value) {
          config!.homeWorkingConfig!.address = value;
        },
        decoration: const InputDecoration(
          border: OutlineInputBorder(),
          labelText: 'Agenda url',
        ),
      ),
    );
  }
}
