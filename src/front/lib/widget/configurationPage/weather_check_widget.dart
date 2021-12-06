import 'package:flutter/material.dart';
import 'package:front/model/weather_check.dart';
import 'package:front/model/weather_condition.dart';
import 'package:front/resource/globals.dart';
import 'package:front/resource/utils.dart';

class WeatherCheckWidget extends StatefulWidget {
  const WeatherCheckWidget({Key? key}) : super(key: key);

  @override
  _WeatherCheckWidgetState createState() => _WeatherCheckWidgetState();
}

class _WeatherCheckWidgetState extends State<WeatherCheckWidget> {
  final List<String> _weatherType = [
    "Rain",
    "Snow",
    "Thunderstorm",
    "Drizzle",
    "Clear"
  ];
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CheckboxListTile(
            title: const Text("Weather Check :"),
            value: config!.officeWorkingConfig!.weatherCheck != null,
            onChanged: (value) {
              setState(() {
                if (value != null) {
                  if (!value) {
                    config!.officeWorkingConfig!.weatherCheck = null;
                  } else {
                    config!.officeWorkingConfig!.weatherCheck = WeatherCheck(
                        maxTemp: null,
                        minTemp: null,
                        weatherConditionsCheck:
                            WeatherCondition(type: null, maxIntensity: 0));
                  }
                }
              });
            }),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
            controller: TextEditingController(
                text: config!.officeWorkingConfig!.weatherCheck != null
                    ? config!.officeWorkingConfig!.weatherCheck!.minTemp
                        .toString()
                    : ""),
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
            controller: TextEditingController(
                text: config!.officeWorkingConfig!.weatherCheck != null
                    ? config!.officeWorkingConfig!.weatherCheck!.maxTemp
                        .toString()
                    : ""),
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
        DropdownButtonHideUnderline(
          child: DropdownButton<String>(
            value: Utils.selectWeatherConditionToString(
                config!.officeWorkingConfig!.weatherCheck != null &&  config!.officeWorkingConfig!.weatherCheck!
                    .weatherConditionsCheck!.type != null
                    ? config!.officeWorkingConfig!.weatherCheck!
                        .weatherConditionsCheck!.type!
                    : WeatherConditionType.clear),
            isDense: true,
            onChanged: (String? newValue) {
              setState(() {
                config!
                    .officeWorkingConfig!
                    .weatherCheck!
                    .weatherConditionsCheck!
                    .type = Utils.selectWeatherCondition(newValue!);
              });
            },
            items: _weatherType.map((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
            controller: TextEditingController(
                text: config!.officeWorkingConfig!.weatherCheck != null
                    ? config!.officeWorkingConfig!.weatherCheck!
                        .weatherConditionsCheck!.maxIntensity
                        .toString()
                    : ""),
            onChanged: (String value) {
              config!.officeWorkingConfig!.weatherCheck!.weatherConditionsCheck!
                  .maxIntensity = int.parse(value);
            },
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              labelText: 'Max intensity',
            ),
          ),
        ),
      ],
    );
  }
}
