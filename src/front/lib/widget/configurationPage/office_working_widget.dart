import 'package:flutter/material.dart';
import 'package:front/model/wake_up_configuration.dart';
import 'package:front/widget/configurationPage/working_widget.dart';

class OfficeWorking extends StatefulWidget {
  const OfficeWorking({Key? key}) : super(key: key);

  @override
  _OfficeWorkingState createState() => _OfficeWorkingState();
}

class _OfficeWorkingState extends State<OfficeWorking> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [WorkingWidget()],
    );
  }
}
