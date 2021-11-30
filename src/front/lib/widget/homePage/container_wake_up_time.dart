import 'package:flutter/material.dart';
import 'package:front/widget/homePage/decoration_wake_up_container.dart';

class WakeUpTime extends StatefulWidget {
  final String wakeUpHour;
  const WakeUpTime(this.wakeUpHour, {Key? key}) : super(key: key);

  @override
  _WakeUpTimeState createState() => _WakeUpTimeState();
}

class _WakeUpTimeState extends State<WakeUpTime> {
  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(8.0),
        child: Container(
          decoration: WakeUpContainerDecoration().create(context),
          child: Center(
              child: Text(widget.wakeUpHour,
                  style: Theme.of(context).textTheme.headline1)),
        ));
  }
}
