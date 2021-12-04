import 'package:flutter/material.dart';
import 'package:front/model/wake_up_configuration.dart';
import 'package:front/resource/globals.dart';

class PositionWidget extends StatefulWidget {
  const PositionWidget({Key? key}) : super(key: key);

  @override
  _PositionWidgetState createState() => _PositionWidgetState();
}

class _PositionWidgetState extends State<PositionWidget> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(
            8,
          ),
          child: TextField(
              onChanged: (String value) {
                config!.homeWorkingConfig!.delay = int.parse(value);
              },
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Latitude',
              )),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
              onChanged: (String value) {
                config!.homeWorkingConfig!.delay = int.parse(value);
              },
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Longitude',
              )),
        ),
      ],
    );
  }
}
