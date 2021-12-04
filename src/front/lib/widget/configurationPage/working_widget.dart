import 'package:flutter/material.dart';
import 'package:front/model/wake_up_configuration.dart';
import 'package:front/resource/globals.dart';
import 'package:front/resource/utils.dart';

class WorkingWidget extends StatefulWidget {
  const WorkingWidget({Key? key}) : super(key: key);

  @override
  _WorkingWidgetState createState() => _WorkingWidgetState();
}

class _WorkingWidgetState extends State<WorkingWidget> {
  @override
  Widget build(BuildContext context) {
    int? second = config!.homeWorkingConfig!.shouldStartAt;
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
          config!.homeWorkingConfig!.shouldStartAt =
              newTime.hour * 3600 + newTime.minute * 60;
        });
      }
    }

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
            onChanged: (String value) {
              config!.homeWorkingConfig!.address = value;
            },
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              labelText: 'Address',
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: ElevatedButton(
            onPressed: _selectTime,
            child: const Text('Select starting time :'),
          ),
        ),
        Text(
          'Selected time: ${Utils.formatSeconds(config!.homeWorkingConfig!.shouldStartAt!)}',
        ),
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: TextField(
            onChanged: (String value) {
              config!.homeWorkingConfig!.preparationDuration = int.parse(value);
            },
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              labelText: 'Preparation duration',
            ),
          ),
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
                labelText: 'Delay',
              )),
        ),
      ],
    );
  }
}
