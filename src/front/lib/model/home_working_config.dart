import 'package:front/model/agenda_check.dart';
import 'package:front/model/position.dart';

class HomeWorkingConfig {
  String? address;
  int? shouldStartAt;
  int? delay;
  int? preparationDuration;
  Position? position;
  AgendaCheck? agendaCheck;

  HomeWorkingConfig(
      {required this.address,
      required this.shouldStartAt,
      required this.preparationDuration,
      required this.position,
      required this.agendaCheck,
      required this.delay});

  factory HomeWorkingConfig.fromJson(Map<String, dynamic> json) {
    return HomeWorkingConfig(
        address: json['address'],
        shouldStartAt: json['shouldStartAt'],
        preparationDuration: json['preparationDuration'],
        delay: json["delay"],
        agendaCheck: json['agendaCheck'] != null
            ? AgendaCheck.fromJson(json['agendaCheck'])
            : null,
        position: json['position'] != null
            ? Position.fromJson(json['position'])
            : null);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (address != null) {
      data['address'] = address!;
    }
    if (shouldStartAt != null) {
      data['shouldStartAt'] = shouldStartAt;
    }
    if (preparationDuration != null) {
      data['preparationDuration'] = preparationDuration;
    }
    if (agendaCheck != null) {
      data['agendaCheck'] = agendaCheck!.toJson();
    }
    if (position != null) {
      data['position'] = position!.toJson();
    }
    return data;
  }
}
