package com.example.demo.services;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class StudentService {
	@Autowired
	private StudentRepository studentRepository;

	public boolean isSaveStudent(Student s) {
		Student s1 = studentRepository.save(s);
		return s1 != null ? true : false;
	}


    public boolean authenticate(String username, String password) {
        Student student = studentRepository.findByUsername(username);
        return student != null && student.getPassword().equals(password);
    }

    public Student findStudentByUsername(String username) {
        return studentRepository.findByUsername(username);
    }
    public List<Student> viewAllStudents(){
    	List<Student> list=studentRepository.findAll();
    	return list;
    }
    public Student deleteStudent(Long id) {
    	Optional<Student> o=studentRepository.findById(id);
    	if(o.isPresent()) {
    		Student student=o.get();
    		studentRepository.deleteById(id);
    		return student;
    	}else {
    		throw new EntityNotFoundException("Student not found with id: " + id);
    	}
    }

}