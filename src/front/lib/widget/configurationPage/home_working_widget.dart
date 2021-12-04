import 'package:flutter/material.dart';
import 'package:front/model/wake_up_configuration.dart';
import 'package:front/widget/configurationPage/agenda_check_widget.dart';
import 'package:front/widget/configurationPage/position_widget.dart';
import 'package:front/widget/configurationPage/working_widget.dart';

class HomeWorking extends StatefulWidget {
  const HomeWorking({Key? key}) : super(key: key);

  @override
  _HomeWorkingState createState() => _HomeWorkingState();
}

class _HomeWorkingState extends State<HomeWorking> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [const WorkingWidget(), PositionWidget(), AgendaCheckWidget()],
    );
  }
}
