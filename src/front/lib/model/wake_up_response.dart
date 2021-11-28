class WakeUpResponse {
  final String reason;
  final int time;
  final bool isHomeWorking;
  final String category;

  WakeUpResponse({required this.category, required this.time, required this.isHomeWorking, required this.reason});

  factory WakeUpResponse.fromJson(Map<String, dynamic> json) {
    return WakeUpResponse(
      reason: json['reason'],
      time: json['time'],
      isHomeWorking: json['homeWorking'],
      category: json['category']
    );
  }

  String formatSeconds(){
    int second = time;
    int hours = (second / 3600).floor();
    second %= 3600;
    int minutes = (second / 60).floor();
    return hours.toString()+":" +minutes.toString();
  }
}