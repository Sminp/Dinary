package com.diary.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/diarys")
public class HomeController {
    @GetMapping("/${account}")
    public String postlistPage() {
        return "postlistPage";
    }
}
