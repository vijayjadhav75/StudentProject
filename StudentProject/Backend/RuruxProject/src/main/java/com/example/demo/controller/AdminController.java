package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Admin;
import com.example.demo.services.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:3000")
public class AdminController {
	@Autowired
	AdminService adService;

	@PostMapping("/saveAdmin")
	public String isAddAdmin(@RequestBody Admin a) {
		boolean b = adService.isAddAdmin(a);
		return b ? "Admin added successfully..." : "Some problem is there...";
	}

	@PostMapping("/adminLogin")
	public ResponseEntity<String> login(@RequestBody Admin admin) {
		// Perform login authentication
		boolean isAuthenticated = adService.authenticate(admin.getUsername(), admin.getPassword());

		if (isAuthenticated) {
			return ResponseEntity.status(HttpStatus.OK).body("Login successful");
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
		}
	}
}