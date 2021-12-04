import 'package:flutter/material.dart';
import 'package:front/model/wake_up_configuration.dart';
import 'package:front/resource/globals.dart';
import 'package:front/widget/homePage/decoration_wake_up_container.dart';

class PositionWidget extends StatefulWidget {
  const PositionWidget({Key? key}) : super(key: key);

  @override
  _PositionWidgetState createState() => _PositionWidgetState();
}

class _PositionWidgetState extends State<PositionWidget> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: WakeUpContainerDecoration()
          .create(context, Theme.of(context).dividerColor.withOpacity(0.6)),
      child: Column(
        children: [
          const Padding(
            padding: EdgeInsets.all(8.0),
            child: Text("Position"),
          ),
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
      ),
    );
  }
}
