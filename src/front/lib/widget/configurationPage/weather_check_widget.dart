import 'package:flutter/material.dart';
import 'package:front/model/wake_up_configuration.dart';
import 'package:front/resource/globals.dart';

class WeatherCheckWidget extends StatefulWidget {
  const WeatherCheckWidget({Key? key}) : super(key: key);

  @override
  _WeatherCheckWidgetState createState() => _WeatherCheckWidgetState();
}

class _WeatherCheckWidgetState extends State<WeatherCheckWidget> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
            onChanged: (String value) {
              config!.officeWorkingConfig!.weatherCheck!.minTemp =
                  double.parse(value);
            },
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              labelText: 'Minimum temperature',
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
            onChanged: (String value) {
              config!.officeWorkingConfig!.weatherCheck!.maxTemp =
                  double.parse(value);
            },
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              labelText: 'Maximum temperature',
            ),
          ),
        ),
      ],
    );
  }
}
