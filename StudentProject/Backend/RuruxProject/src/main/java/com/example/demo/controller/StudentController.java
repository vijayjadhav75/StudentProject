package com.example.demo.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Student;
import com.example.demo.services.StudentService;

@RestController
@RequestMapping("/api/students")
@CrossOrigin("http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<String> addStudent(@RequestBody Student student) {
        boolean isSaved = studentService.isSaveStudent(student);
        if (isSaved) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Student added successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add student.");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Student student) {
        // Perform login authentication
        boolean isAuthenticated = studentService.authenticate(student.getUsername(), student.getPassword());
        
        if (isAuthenticated) {
            return ResponseEntity.status(HttpStatus.OK).body("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
    @GetMapping("/viewStudent")
    public ResponseEntity<Student> viewStudent(@RequestParam("username") String username) {
        Student student = studentService.findStudentByUsername(username);
        if (student != null) {
            return ResponseEntity.ok(student);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/viewAllStudent")
    public List<Student> viewAllStudent(){
    	List<Student> list=studentService.viewAllStudents();
    	return list;
    }
    @DeleteMapping("/deleteStudent/{id}")
    public Student deleteStudentById(@PathVariable("id") Long id) {
		Student s=studentService.deleteStudent(id);
		return s;
	}
}
