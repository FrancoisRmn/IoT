import 'package:front/resource/utils.dart';

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
    this.time = Utils.formatSeconds(time);
  }

  factory WakeUpResponse.fromJson(Map<String, dynamic> json) {
    return WakeUpResponse(
        reason: json['reason'],
        time: json['time'],
        isHomeWorking: json['homeWorking'],
        category: json['category']);
  }
}
