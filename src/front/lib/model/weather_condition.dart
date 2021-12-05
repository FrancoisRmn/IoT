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
    if (type != null) {
      data['type'] = type!;
    }
    if (maxIntensity != null) {
      data['maxIntensity'] = maxIntensity! as String;
    }
    return data;
  }
}
