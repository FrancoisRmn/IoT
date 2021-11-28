import 'dart:convert';

import 'package:front/model/wake_up_response.dart';
import 'package:front/resource/constants.dart';
import 'package:http/http.dart' as http;

Future<WakeUpResponse> fetchWakeUpReason() async {
  final response = await http
      .get(Uri.parse(API_URL));

  if (response.statusCode == 200) {
    return WakeUpResponse.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to load album');
  }
}