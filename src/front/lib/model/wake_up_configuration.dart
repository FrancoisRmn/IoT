import 'home_working_config.dart';
import 'office_working_config.dart';

class WakeUpConfiguration {
  bool preferHomeWorking;
  OfficeWorkingConfig? officeWorkingConfig;
  HomeWorkingConfig? homeWorkingConfig;

  WakeUpConfiguration(
      {required this.preferHomeWorking,
      required this.officeWorkingConfig,
      required this.homeWorkingConfig});

  factory WakeUpConfiguration.fromJson(Map<String, dynamic> json) {
    return WakeUpConfiguration(
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
    data['preferHomeWorking'] = preferHomeWorking;
    if (officeWorkingConfig != null) {
      data['officeWorkingConfig'] = officeWorkingConfig!.toJson();
    }
    if (homeWorkingConfig != null) {
      data['homeWorkingConfig'] = homeWorkingConfig!.toJson();
    }
    return data;
  }
}
