class DirectionCheck {
  int? noWakeUpBefore;
  RoutingProfile? mode;

  DirectionCheck({required this.noWakeUpBefore, required String mode}) {
    this.mode = selectRouting(mode);
  }

  RoutingProfile? selectRouting(String mode) {
    switch (mode) {
      case "driving":
        return RoutingProfile.driving;
      case "walking":
        return RoutingProfile.walking;
      case "bicycling":
        return RoutingProfile.bicycling;
      case "transit":
        return RoutingProfile.transit;
      default:
        return null;
    }
  }

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

enum RoutingProfile { driving, walking, bicycling, transit }
