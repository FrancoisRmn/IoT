class WakeUpResponse {
  final String reason;
  String? time;
  final bool isHomeWorking;
  final String category;

  WakeUpResponse(
      {required this.category,
      required int time,
      required this.isHomeWorking,
      required this.reason}) {
    this.time = formatSeconds(time);
  }

  factory WakeUpResponse.fromJson(Map<String, dynamic> json) {
    return WakeUpResponse(
        reason: json['reason'],
        time: json['time'],
        isHomeWorking: json['homeWorking'],
        category: json['category']);
  }

  String formatSeconds(int second) {
    int hours = (second / 3600).floor();
    second %= 3600;
    int minutes = (second / 60).floor();
    return hours.toString() + ":" + minutes.toString();
  }
}
