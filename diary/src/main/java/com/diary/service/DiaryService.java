package com.diary.service;

import com.diary.Entity.DiaryEntity;
import com.diary.Repository.DiaryRepository;
import com.diary.dto.DiaryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DiaryService {
    private final DiaryRepository diaryRepository;

    @Autowired
    public DiaryService(DiaryRepository diaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    public ResponseEntity<String> save(DiaryDto diaryDto) {
        try {
            DiaryEntity diaryEntity = DiaryEntity.toSaveEntity(diaryDto);
            diaryRepository.save(diaryEntity);
            return ResponseEntity.ok("PostListPage");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("");
        }
    }
}