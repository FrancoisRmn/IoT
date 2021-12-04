import 'home_working_config.dart';
import 'office_working_config.dart';

class WakeUpConfiguration {
  String? localTimeZone;
  bool? preferHomeWorking;
  OfficeWorkingConfig? officeWorkingConfig;
  HomeWorkingConfig? homeWorkingConfig;

  WakeUpConfiguration(
      {required this.localTimeZone,
      required this.preferHomeWorking,
      required this.officeWorkingConfig,
      required this.homeWorkingConfig});

  factory WakeUpConfiguration.fromJson(Map<String, dynamic> json) {
    return WakeUpConfiguration(
        localTimeZone: json["localTimeZone"],
        preferHomeWorking: json['preferHomeWorking'],
        officeWorkingConfig: json['officeWorkingConfig'] != null
            ? OfficeWorkingConfig.fromJson(json['officeWorkingConfig'])
            : null,
        homeWorkingConfig: json['homeWorkingConfig'] != null
            ? HomeWorkingConfig.fromJson(json['homeWorkingConfig'])
            : null);
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (localTimeZone != null) {
      data["localTimeZone"] = localTimeZone;
    }
    if (preferHomeWorking != null) {
      data['preferHomeWorking'] = preferHomeWorking;
    }
    if (officeWorkingConfig != null) {
      data['officeWorkingConfig'] = officeWorkingConfig!.toJson();
    }
    if (homeWorkingConfig != null) {
      data['homeWorkingConfig'] = homeWorkingConfig!.toJson();
    }
    return data;
  }
}
