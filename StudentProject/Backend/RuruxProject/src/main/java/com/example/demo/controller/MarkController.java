package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Mark;
import com.example.demo.services.MarkService;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin("http://localhost:3000")
public class MarkController {
	@Autowired
	private MarkService markService;

	@PostMapping("/saveMark")
	public String saveMark(@RequestBody Mark mark) {
		boolean b = markService.saveMark(mark);
		return (b) ? "Mark added successfully..." : "Some problem in mark adding...";
	}

	@GetMapping("/{username}")
	public List<Mark> getMarksByUsername(@PathVariable String username) {
		return markService.getMarksByUsername(username);
	}

	@GetMapping("/viewMarks")
	public List<Mark> viewAllMarks() {
		List<Mark> list = markService.viewAllMarks();
		return list;
	}

}