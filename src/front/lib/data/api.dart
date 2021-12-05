import 'dart:convert';

import 'package:front/model/wake_up_configuration.dart';
import 'package:front/model/wake_up_response.dart';
import 'package:front/resource/constants.dart';
import 'package:http/http.dart' as http;

Future<WakeUpResponse> fetchWakeUpReason() async {
  final response = await http.get(Uri.parse(API_URL + "wakeup"));

  if (response.statusCode == 200) {
    return WakeUpResponse.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to load WakeUpResponse');
  }
}

Future<WakeUpConfiguration> fetchWakeUpConfiguration() async {
  final response = await http.get(Uri.parse(API_URL + "wakeup/config"));

  if (response.statusCode == 200) {
    return WakeUpConfiguration.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to load WakeUpResponse');
  }
}

Future<WakeUpConfiguration> postWakeUpConfiguration(
    WakeUpConfiguration wakeUpConfiguration) async {
  final response = await http.post(Uri.parse(API_URL + "wakeup/config"),
      headers: {"Content-Type": "application/json"},
      body: json.encode(wakeUpConfiguration.toJson()));
  print(wakeUpConfiguration.toJson());
  if (response.statusCode == 201) {
    return WakeUpConfiguration.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to post WakeUpResponse');
  }
}
