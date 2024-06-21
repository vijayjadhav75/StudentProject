package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Mark;
import com.example.demo.repository.MarkRepository;

@Service
public class MarkService {
	@Autowired
	private MarkRepository markRepository;

	public boolean saveMark(Mark mark) {
		Mark m = markRepository.save(mark);
		return m != null ? true : false;
	}

	public List<Mark> getMarksByUsername(String username) {

		return markRepository.findByStudent_Username(username);
	}
	public List<Mark> viewAllMarks(){
		List<Mark> list=markRepository.findAll();
		return list;
	}
}
