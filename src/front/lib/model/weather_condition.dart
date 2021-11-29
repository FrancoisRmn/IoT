class WeatherCondition {
  String? type;
  int? maxIntensity;

  WeatherCondition({required this.type, required this.maxIntensity});

  factory WeatherCondition.fromJson(Map<String, dynamic> json) {
    return WeatherCondition(
        type: json['type'], maxIntensity: json['maxIntensity']);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['type'] = type;
    data['maxIntensity'] = maxIntensity;
    return data;
  }
}
