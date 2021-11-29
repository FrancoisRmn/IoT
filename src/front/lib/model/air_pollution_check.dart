class AirPollutionCheck {
  int? minAqi;

  AirPollutionCheck({required this.minAqi});

  factory AirPollutionCheck.fromJson(Map<String, dynamic> json) {
    return AirPollutionCheck(minAqi: json["minAqi"]);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['minAqi'] = minAqi;
    return data;
  }
}
