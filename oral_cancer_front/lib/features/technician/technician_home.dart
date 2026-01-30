import 'package:flutter/material.dart';

class TechnicianHome extends StatelessWidget {
  const TechnicianHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Technician Dashboard")),
      body: const Center(
        child: Text(
          "Technician logged in",
          style: TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}
