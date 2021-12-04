import 'package:flutter/material.dart';
import 'package:front/model/wake_up_configuration.dart';
import 'package:front/widget/configurationPage/agenda_check_widget.dart';
import 'package:front/widget/configurationPage/position_widget.dart';
import 'package:front/widget/configurationPage/working_widget.dart';
import 'package:front/widget/homePage/decoration_wake_up_container.dart';

class HomeWorking extends StatefulWidget {
  const HomeWorking({Key? key}) : super(key: key);

  @override
  _HomeWorkingState createState() => _HomeWorkingState();
}

class _HomeWorkingState extends State<HomeWorking> {
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
              child: Text("HomeWorking config"),
            ),
            WorkingWidget(
              isHomeWorking: true,
            ),
            const PositionWidget(),
            const AgendaCheckWidget()
          ],
        ),
      ),
    );
  }
}
