import 'dart:convert';
import 'package:http/http.dart' as http;
import 'constants.dart';
import 'auth_storage.dart';

class ApiClient {
  static Future<http.Response> post(
      String endpoint,
      Map<String, dynamic> body, {
        bool auth = false,
      }) async {
    final headers = {
      'Content-Type': 'application/json',
      if (auth) 'Authorization': 'Bearer ${await AuthStorage.getToken()}'
    };

    return http.post(
      Uri.parse("${AppConstants.baseUrl}$endpoint"),
      headers: headers,
      body: jsonEncode(body),
    );
  }

  static Future<http.Response> get(
      String endpoint, {
        bool auth = false,
      }) async {
    final headers = {
      if (auth) 'Authorization': 'Bearer ${await AuthStorage.getToken()}'
    };

    return http.get(
      Uri.parse("${AppConstants.baseUrl}$endpoint"),
      headers: headers,
    );
  }
}
