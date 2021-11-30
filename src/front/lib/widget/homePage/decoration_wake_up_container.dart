import 'package:flutter/material.dart';

class WakeUpContainerDecoration {
  BoxDecoration create(BuildContext context) {
    return BoxDecoration(
      borderRadius: const BorderRadius.all(Radius.circular(20)),
      color: Theme.of(context).primaryColor,
    );
  }
}
