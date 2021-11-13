import 'package:flutter/cupertino.dart';
import 'package:front/resource/theme.dart';

class WakeUpContainerDecoration {
  BoxDecoration create() {
    return BoxDecoration(
      borderRadius: const BorderRadius.all(Radius.circular(20)),
      color: WakeUpTheme.appTheme.primaryColor,
    );
  }
}
