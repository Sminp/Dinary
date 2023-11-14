package com.diary.controller;

import com.diary.dto.DiaryDto;
import com.diary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/diary")
public class DiaryController {
    @Autowired DiaryService diaryService;

    @GetMapping("/{account}")
    public ResponseEntity<String> postForm() {
        return ResponseEntity.ok("WritePage");
    }

    @PostMapping("/{account}")
    public ResponseEntity<String> post(@ModelAttribute DiaryDto diaryDto) {
        System.out.println("diaryDto = " + diaryDto.toString());
        diaryService.save(diaryDto);
        return ResponseEntity.ok("PostListPage");
    }


}
