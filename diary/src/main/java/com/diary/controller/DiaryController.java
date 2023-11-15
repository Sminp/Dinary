package com.diary.controller;

import com.diary.dto.RewriteDto;
import com.diary.dto.WriteDto;
import com.diary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/diary")
public class DiaryController {
    @Autowired
    DiaryService diaryService;

    /*
    @GetMapping("/{account}")
    public ResponseEntity<String> postForm() {
        return ResponseEntity.ok("WritePage");
    }*/

    //글 저장하기
    @PostMapping("/new")
    public ResponseEntity<?> write(@RequestBody WriteDto writeDto) {
        System.out.println("글작성: " + writeDto.toString());
        ResponseEntity<?> result = diaryService.saveWrite(writeDto);
        return result;
    }

    //글 수정하기
    @PostMapping("/rewrite")
    public ResponseEntity<?> rewrite(@RequestBody RewriteDto rewriteDto) {
        System.out.println("글수정: "+rewriteDto.toString());
        ResponseEntity<?> result = diaryService.reWrite(rewriteDto);
        return result;
    }
}
