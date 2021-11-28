import 'package:flutter/material.dart';
import 'package:front/resource/theme.dart';

class WakeUpReason extends StatelessWidget {
  final String reasonText;
  final String? reasonDescription;
  final ValueNotifier<String> valueNotifier;
  final bool isReasonToWakeUp;

  const WakeUpReason(this.reasonText, this.reasonDescription,
      this.valueNotifier, this.isReasonToWakeUp,
      {Key? key})
      : super(key: key);

  @override
  Widget build(
    BuildContext context,
  ) {
    return Center(
        child: ElevatedButton(
      style: ButtonStyle(
          shape: MaterialStateProperty.all<RoundedRectangleBorder>(
              RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(18.0))),
          backgroundColor: isReasonToWakeUp
              ? MaterialStateProperty.all<Color>(
                  Theme.of(context).backgroundColor)
              : MaterialStateProperty.all<Color>(
                  Theme.of(context).disabledColor)),
      child: Text(
        reasonText,
        style: Theme.of(context).textTheme.headline5,
      ),
      onPressed: reasonDescription != null ? () => {valueNotifier.value = reasonDescription!} : null,
    ));
  }
}
