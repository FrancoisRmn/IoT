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
        maxTemp: (json['maxTemp']).toDouble(),
        minTemp: (json['minTemp']).toDouble(),
        weatherConditionsCheck: json['weatherConditionsCheck'] != null
            ? WeatherCondition.fromJson(json['weatherConditionsCheck'])
            : null);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (minTemp != null) {
      data['minTemp'] = minTemp!;
    }
    if (maxTemp != null) {
      data['maxTemp'] = maxTemp!;
    }
    if (weatherConditionsCheck != null) {
      data['weatherConditionsCheck'] = weatherConditionsCheck!.toJson();
    }
    return data;
  }
}
