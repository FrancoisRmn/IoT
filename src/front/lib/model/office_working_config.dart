import 'package:front/model/position.dart';

import 'direction_check.dart';

class OfficeWorkingConfig {
  String address;
  int shouldStartAt;
  int preparationDuration;
  Position? position;
  DirectionCheck? directionCheck;

  OfficeWorkingConfig(
      {required this.address,
      required this.shouldStartAt,
      required this.preparationDuration,
      required this.position,
      required this.directionCheck});

  factory OfficeWorkingConfig.fromJson(Map<String, dynamic> json) {
    return OfficeWorkingConfig(
        address: json['address'],
        shouldStartAt: json['shouldStartAt'],
        preparationDuration: json['preparationDuration'],
        position: json['position'] != null
            ? Position.fromJson(json['position'])
            : null,
        directionCheck: json['directionCheck'] != null
            ? DirectionCheck.fromJson(json['directionCheck'])
            : null);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();
    data['address'] = address;
    data['shouldStartAt'] = shouldStartAt;
    data['preparationDuration'] = preparationDuration;
    if (position != null) {
      data['position'] = position!.toJson();
    }
    if (directionCheck != null) {
      data['directionCheck'] = directionCheck!.toJson();
    }
    return data;
  }
}
