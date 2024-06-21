package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Admin;
import com.example.demo.repository.AdminRepository;

@Service("adService")
public class AdminService {
	@Autowired
	AdminRepository adRepo;

	public boolean isAddAdmin(Admin a) {
		Admin admin = adRepo.save(a);
		return admin != null ? true : false;
	}

	public boolean authenticate(String username, String password) {
		Admin admin = adRepo.findByUsername(username);
		return admin != null && admin.getPassword().equals(password);
	}
}