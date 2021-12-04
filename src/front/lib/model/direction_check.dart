import 'package:front/resource/utils.dart';

class DirectionCheck {
  int? noWakeUpBefore;
  RoutingProfile? mode;

  DirectionCheck({required this.noWakeUpBefore, required String mode}) {
    this.mode = Utils.selectRouting(mode);
  }

  factory DirectionCheck.fromJson(Map<String, dynamic> json) {
    return DirectionCheck(
        noWakeUpBefore: json['noWakeUpBefore'], mode: json['mode']);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (noWakeUpBefore != null) {
      data['noWakeUpBefore'] = noWakeUpBefore;
    }
    if (mode != null) {
      data['mode'] = Utils.selectRoutingToString(mode!)!;
    }
    return data;
  }
}

enum RoutingProfile { driving, walking, bicycling, transit }
