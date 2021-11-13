import 'package:flutter/material.dart';

import 'decoration_wake_up_container.dart';

class WakeUpDetail extends StatefulWidget {
  const WakeUpDetail({Key? key}) : super(key: key);

  @override
  _WakeUpDetailState createState() => _WakeUpDetailState();
}

class _WakeUpDetailState extends State<WakeUpDetail> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
        decoration: WakeUpContainerDecoration().create(),
        height: 500,
      ),
    );
  }
}
