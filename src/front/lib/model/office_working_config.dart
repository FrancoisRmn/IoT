import 'package:front/model/air_pollution_check.dart';
import 'package:front/model/position.dart';
import 'package:front/model/weather_check.dart';

import 'direction_check.dart';

class OfficeWorkingConfig {
  String? address;
  int? shouldStartAt;
  int? preparationDuration;
  int? delay;
  Position? position;
  DirectionCheck? directionCheck;
  WeatherCheck? weatherCheck;
  AirPollutionCheck? airPollutionCheck;

  OfficeWorkingConfig(
      {required this.delay,
      required this.address,
      required this.shouldStartAt,
      required this.preparationDuration,
      required this.position,
      required this.directionCheck,
      required this.weatherCheck,
      required this.airPollutionCheck});

  factory OfficeWorkingConfig.fromJson(Map<String, dynamic> json) {
    return OfficeWorkingConfig(
        delay: json["delay"],
        address: json['address'],
        shouldStartAt: json['shouldStartAt'],
        preparationDuration: json['preparationDuration'],
        position: json['position'] != null
            ? Position.fromJson(json['position'])
            : null,
        directionCheck: json['directionCheck'] != null
            ? DirectionCheck.fromJson(json['directionCheck'])
            : null,
        airPollutionCheck: json['airPollutionCheck'] != null
            ? AirPollutionCheck.fromJson(json['airPollutionCheck'])
            : null,
        weatherCheck: json['weatherCheck'] != null
            ? WeatherCheck.fromJson(json['weatherCheck'])
            : null);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (address != null) {
      data['address'] = address;
    }
    if (delay != null) {
      data['delay'] = delay;
    }
    if (shouldStartAt != null) {
      data['shouldStartAt'] = shouldStartAt;
    }
    if (preparationDuration != null) {
      data['preparationDuration'] = preparationDuration;
    }
    if (position != null) {
      data['position'] = position!.toJson();
    }
    if (directionCheck != null) {
      data['directionCheck'] = directionCheck!.toJson();
    }
    if (airPollutionCheck != null) {
      data['airPollutionCheck'] = airPollutionCheck!.toJson();
    }
    if (weatherCheck != null) {
      data['weatherCheck'] = weatherCheck!.toJson();
    }
    return data;
  }
}
