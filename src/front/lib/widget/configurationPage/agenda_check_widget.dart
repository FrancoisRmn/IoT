import 'package:flutter/material.dart';
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
        controller: TextEditingController(
            text: config!.homeWorkingConfig!.agendaCheck != null
                ? config!.homeWorkingConfig!.agendaCheck!.url
                : ""),
        onChanged: (String value) {
          config!.homeWorkingConfig!.agendaCheck!.url = value;
        },
        decoration: const InputDecoration(
          border: OutlineInputBorder(),
          labelText: 'Agenda url',
        ),
      ),
    );
  }
}
