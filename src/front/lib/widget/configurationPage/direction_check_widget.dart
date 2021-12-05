import 'package:flutter/material.dart';
import 'package:front/resource/globals.dart';
import 'package:front/resource/utils.dart';

class DirectionCheckWidget extends StatefulWidget {
  const DirectionCheckWidget({Key? key}) : super(key: key);

  @override
  _DirectionCheckWidgetState createState() => _DirectionCheckWidgetState();
}

class _DirectionCheckWidgetState extends State<DirectionCheckWidget> {
  @override
  Widget build(BuildContext context) {
    List<String> _routingMode = ["driving", "walking", "transit", "bicycling"];
    int? second = config!.officeWorkingConfig!.directionCheck!.noWakeUpBefore;
    int hours = (second! / 3600).floor();
    second %= 3600;
    int minutes = (second / 60).floor();
    TimeOfDay _time = TimeOfDay(hour: hours, minute: minutes);

    void _selectTime() async {
      final TimeOfDay? newTime = await showTimePicker(
        context: context,
        initialTime: _time,
      );
      if (newTime != null) {
        setState(() {
          _time = newTime;
          config!.officeWorkingConfig!.directionCheck!.noWakeUpBefore =
              newTime.hour * 3600 + newTime.minute * 60;
        });
      }
    }

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ElevatedButton(
            onPressed: _selectTime,
            child: const Text('Select no wake up before time :'),
          ),
        ),
        Text(
          'Selected time: ${config!.officeWorkingConfig!.directionCheck!.noWakeUpBefore!}',
        ),
        DropdownButtonHideUnderline(
          child: DropdownButton<String>(
            value: Utils.selectRoutingToString(
                config!.officeWorkingConfig!.directionCheck!.mode!),
            isDense: true,
            onChanged: (String? newValue) {
              setState(() {
                config!.officeWorkingConfig!.directionCheck!.mode =
                    Utils.selectRouting(newValue!);
              });
            },
            items: _routingMode.map((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
          ),
        ),
      ],
    );
  }
}
