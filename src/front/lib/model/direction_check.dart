class DirectionCheck {
  int noWakeUpBefore;
  String mode;

  DirectionCheck({required this.noWakeUpBefore, required this.mode});

  factory DirectionCheck.fromJson(Map<String, dynamic> json) {
    return DirectionCheck(
        noWakeUpBefore: json['noWakeUpBefore'], mode: json['mode']);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['noWakeUpBefore'] = noWakeUpBefore;
    data['mode'] = mode;
    return data;
  }
}
