import 'package:flutter/material.dart';

class WakeUpContainerDecoration {
  BoxDecoration create(BuildContext context, Color color) {
    return BoxDecoration(
      borderRadius: const BorderRadius.all(Radius.circular(20)),
      color: color,
    );
  }
}
