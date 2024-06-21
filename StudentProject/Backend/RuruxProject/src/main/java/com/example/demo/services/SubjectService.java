package com.example.demo.services;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Subject;
import com.example.demo.repository.SubjectRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class SubjectService {
    private final SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public boolean saveSubject(Subject subject) {
        if (subject != null && subject.getSubjectName() != null && !subject.getSubjectName().isEmpty()) {
            Subject savedSubject = subjectRepository.save(subject);
            return savedSubject != null;
        } else {
            return false;
        }
    }
    public List<Subject> viewAllSubjects(){
    	List<Subject> list=subjectRepository.findAll();
    	return list;
    }
    public Subject deleteSubjectById(Long id) {
        Optional<Subject> optionalSubject = subjectRepository.findById(id);
        if (optionalSubject.isPresent()) {
            Subject subject = optionalSubject.get();
            subjectRepository.deleteById(id);
            return subject;
        } else {
            throw new EntityNotFoundException("Subject not found with id: " + id);
        }
    }
}
