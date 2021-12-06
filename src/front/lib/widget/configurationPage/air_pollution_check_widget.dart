import 'package:flutter/material.dart';
import 'package:front/model/air_pollution_check.dart';
import 'package:front/resource/globals.dart';

class AirPollutionCheckWidget extends StatefulWidget {
  const AirPollutionCheckWidget({Key? key}) : super(key: key);

  @override
  _AirPollutionCheckWidgetState createState() =>
      _AirPollutionCheckWidgetState();
}

class _AirPollutionCheckWidgetState extends State<AirPollutionCheckWidget> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CheckboxListTile(
            title: const Text("Air pollution Check :"),
            value: config!.officeWorkingConfig!.airPollutionCheck != null,
            onChanged: (value) {
              setState(() {
                if (value != null) {
                  if (!value) {
                    config!.officeWorkingConfig!.airPollutionCheck = null;
                  } else {
                    config!.officeWorkingConfig!.airPollutionCheck =
                        AirPollutionCheck(minAqi: null);
                  }
                }
              });
            }),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
            controller: TextEditingController(
                text: config!.officeWorkingConfig!.airPollutionCheck != null
                    ? config!.officeWorkingConfig!.airPollutionCheck!.minAqi
                        .toString()
                    : ""),
            onChanged: (String value) {
              config!.officeWorkingConfig!.airPollutionCheck!.minAqi =
                  int.parse(value);
            },
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              labelText: 'Minimum Aqi',
            ),
          ),
        ),
      ],
    );
  }
}
