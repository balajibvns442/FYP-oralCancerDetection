import 'package:flutter/material.dart';
import '../features/technician/technician_home.dart';
import '../features/doctor/doctor_home.dart';

class RoleRouter {
  static Widget routeByRole(String role) {
    switch (role) {
      case 'TECHNICIAN':
        return const TechnicianHome();
      case 'DOCTOR':
        return const DoctorHome();
      default:
        return const Scaffold(
          body: Center(child: Text("Unknown role")),
        );
    }
  }
}
