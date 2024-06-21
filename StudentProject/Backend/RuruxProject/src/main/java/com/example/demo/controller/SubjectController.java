package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Subject;
import com.example.demo.services.SubjectService;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin("http://localhost:3000")
public class SubjectController {
	@Autowired
	private SubjectService subjectService;

	@PostMapping("/saveSubject")
	public String isSaveSubject(@RequestBody Subject s) {
		boolean b = subjectService.saveSubject(s);
		return (b) ? "Subject added successfully..." : "Some problem in subject adding...";
	}
	@GetMapping("/viewAllSubject")
	public List<Subject> viewAllSubject(){
		List<Subject> list=subjectService.viewAllSubjects();
		return list;
	}
	@DeleteMapping("/deleteSubject/{id}")
	public Subject deleteSubjectById(@PathVariable("id") Long id) {
		Subject s=subjectService.deleteSubjectById(id);
		return s;
	}
}
