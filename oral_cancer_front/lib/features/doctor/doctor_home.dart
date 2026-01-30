import 'package:flutter/material.dart';

class DoctorHome extends StatelessWidget {
  const DoctorHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Doctor Dashboard")),
      body: const Center(
        child: Text(
          "Doctor logged in",
          style: TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}
