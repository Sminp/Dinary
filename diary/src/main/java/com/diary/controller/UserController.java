package com.diary.controller;

import com.diary.dto.LoginDto;
import com.diary.dto.ResponseDto;
import com.diary.dto.SignUpDto;
import com.diary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired UserService userService;

    @PostMapping("/new")
    public ResponseEntity<?> signup(@RequestBody SignUpDto requestBody){
        System.out.println(requestBody.toString());
        ResponseEntity<?> result = userService.signUp(requestBody);
        //ResponseDto<?> result = userService.signUp(requestBody);
        return result;
    }


    @PostMapping("/{account}")
    public ResponseEntity<?> login(@RequestBody LoginDto requestBody){
        System.out.println(requestBody.toString());
        ResponseEntity<?> result = userService.logIn(requestBody);
        return result;
    }

    @GetMapping("/{account}")
    public ResponseEntity<?> accountInfo(@RequestBody String requestBody){
        System.out.println(requestBody);
        ResponseEntity<?> result = userService.logInAf(requestBody);
        return result;
    }
}
