import 'package:flutter/material.dart';
import 'package:front/resource/theme.dart';

class WakeUpReason extends StatelessWidget {
  final String reasonText;
  const WakeUpReason(this.reasonText, {Key? key}) : super(key: key);

  @override
  Widget build(
    BuildContext context,
  ) {
    return Container(
      child: Center(
          child: ElevatedButton(
        style: ButtonStyle(
            shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(18.0))),
            backgroundColor: MaterialStateProperty.all<Color>(
                WakeUpTheme.appTheme.backgroundColor)),
        child: Text(
          reasonText,
          style: WakeUpTheme.appTheme.textTheme.headline5,
        ),
        onPressed: () => {},
      )),
    );
  }
}
