import 'package:flutter/material.dart';

import 'decoration_wake_up_container.dart';

class WakeUpDetail extends StatefulWidget {
  ValueNotifier<String> textDescription;
  WakeUpDetail(this.textDescription, {Key? key}) : super(key: key);

  @override
  _WakeUpDetailState createState() => _WakeUpDetailState();
}

class _WakeUpDetailState extends State<WakeUpDetail> {
  
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 8),
      child: Container(
        decoration: WakeUpContainerDecoration().create(),
        child: Text(widget.textDescription.value),
      ),
    );
  }
}
