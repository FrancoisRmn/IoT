import 'package:front/resource/utils.dart';

class WeatherCondition {
  WeatherConditionType? type;
  int? maxIntensity;

  WeatherCondition({required this.type, required this.maxIntensity});

  factory WeatherCondition.fromJson(Map<String, dynamic> json) {
    return WeatherCondition(
        type: Utils.selectWeatherCondition(json['type']), maxIntensity: json['maxIntensity']);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (type != null) {
      data['type'] = Utils.selectWeatherConditionToString(type!);
    }
    if (maxIntensity != null) {
      data['maxIntensity'] = maxIntensity!;
    }
    return data;
  }
}
enum WeatherConditionType { rain,snow, thunderstorm,drizzle,clear}