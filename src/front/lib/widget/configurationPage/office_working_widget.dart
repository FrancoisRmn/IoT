import 'package:flutter/material.dart';
import 'package:front/widget/configurationPage/air_pollution_check_widget.dart';
import 'package:front/widget/configurationPage/direction_check_widget.dart';
import 'package:front/widget/configurationPage/weather_check_widget.dart';
import 'package:front/widget/configurationPage/working_widget.dart';
import 'package:front/widget/homePage/decoration_wake_up_container.dart';

class OfficeWorking extends StatefulWidget {
  const OfficeWorking({Key? key}) : super(key: key);

  @override
  _OfficeWorkingState createState() => _OfficeWorkingState();
}

class _OfficeWorkingState extends State<OfficeWorking> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
        decoration: WakeUpContainerDecoration()
            .create(context, Theme.of(context).dividerColor.withOpacity(0.3)),
        child: Column(
          children: [
            const Padding(
              padding: EdgeInsets.all(8.0),
              child: Text("OfficeWorking config"),
            ),
            WorkingWidget(
              isHomeWorking: false,
            ),
            const DirectionCheckWidget(),
            const WeatherCheckWidget(),
            const AirPollutionCheckWidget()
          ],
        ),
      ),
    );
  }
}
