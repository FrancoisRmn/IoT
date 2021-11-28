import 'package:front/model/position.dart';

class HomeWorkingConfig {
  String address;
  int shouldStartAt;
  int preparationDuration;
  Position? position;

  HomeWorkingConfig(
      {required this.address,
      required this.shouldStartAt,
      required this.preparationDuration,
      required this.position});

  factory HomeWorkingConfig.fromJson(Map<String, dynamic> json) {
    return HomeWorkingConfig(
        address: json['address'],
        shouldStartAt: json['shouldStartAt'],
        preparationDuration: json['preparationDuration'],
        position: json['position'] != null
            ? Position.fromJson(json['position'])
            : null);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['address'] = address;
    data['shouldStartAt'] = shouldStartAt;
    data['preparationDuration'] = preparationDuration;
    if (position != null) {
      data['position'] = position!.toJson();
    }
    return data;
  }
}
