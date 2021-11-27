class WakeUpResponse {
  final String reason;
  WakeUpResponse({required this.reason});

  factory WakeUpResponse.fromJson(Map<String, dynamic> json) {
    return WakeUpResponse(
      reason: json['reason'],
    );
  }
}