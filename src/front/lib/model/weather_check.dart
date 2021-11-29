import 'dart:ffi';

import 'package:front/model/weather_condition.dart';

class WeatherCheck {
  double? minTemp;
  double? maxTemp;
  WeatherCondition? weatherConditionsCheck;

  WeatherCheck(
      {required this.maxTemp,
      required this.minTemp,
      required this.weatherConditionsCheck});

  factory WeatherCheck.fromJson(Map<String, dynamic> json) {
    return WeatherCheck(
        maxTemp: json['maxTemp'],
        minTemp: json['minTemp'],
        weatherConditionsCheck: json['weatherConditionsCheck'] != null
            ? WeatherCondition.fromJson(json['weatherConditionsCheck'])
            : null);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['minTemp'] = minTemp;
    data['maxTemp'] = maxTemp;
    if (weatherConditionsCheck != null) {
      data['weatherConditionsCheck'] = weatherConditionsCheck!.toJson();
    }
    return data;
  }
}
