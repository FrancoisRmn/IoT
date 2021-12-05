import 'package:flutter/material.dart';
import 'package:front/resource/globals.dart';
import 'package:front/widget/homePage/decoration_wake_up_container.dart';

class PositionWidget extends StatefulWidget {
  bool isHomeWorking = true;
  PositionWidget({Key? key, required this.isHomeWorking}) : super(key: key);

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
                controller: TextEditingController(
                    text: widget.isHomeWorking
                        ? config!.homeWorkingConfig!.position!.lat.toString()
                        : config!.officeWorkingConfig!.position!.lat
                            .toString()),
                onChanged: (String value) {
                  widget.isHomeWorking
                      ? config!.homeWorkingConfig!.position!.lat =
                          double.parse(value)
                      : config!.officeWorkingConfig!.position!.lat =
                          double.parse(value);
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
                controller: TextEditingController(
                    text: widget.isHomeWorking
                        ? config!.homeWorkingConfig!.position!.lon.toString()
                        : config!.officeWorkingConfig!.position!.lon
                            .toString()),
                onChanged: (String value) {
                  widget.isHomeWorking
                      ? config!.homeWorkingConfig!.position!.lon =
                          double.parse(value)
                      : config!.officeWorkingConfig!.position!.lon =
                          double.parse(value);
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
