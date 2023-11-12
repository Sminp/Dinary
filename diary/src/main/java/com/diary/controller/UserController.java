package com.diary.controller;

import com.diary.dto.LoginDto;
import com.diary.dto.SignUpDto;
import com.diary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired UserService userService;

    //회원가입
    @PostMapping("/new")
    public ResponseEntity<?> signup(@RequestBody SignUpDto requestBody){
        System.out.println(requestBody.toString());
        ResponseEntity<?> result = userService.signUp(requestBody);
        //ResponseDto<?> result = userService.signUp(requestBody);
        return result;
    }

    //로그인
    @PostMapping("/{account}")
    public ResponseEntity<?> login(@RequestBody LoginDto requestBody){
        System.out.println(requestBody.toString());
        ResponseEntity<?> result = userService.logIn(requestBody);
        return result;
    }

    //로그인시 계정 정보넘기기
    @GetMapping("/{account}")
    public ResponseEntity<?> accountInfo(@PathVariable String account){
        System.out.println(account);
        ResponseEntity<?> result = userService.logInAf(account);
        return result;
    }

    //비밀번호 변경 (LoginDto가 account, password를 받는 객체라서 이거썼습니다.)
    @PostMapping("/changePw")
    public ResponseEntity<?> changePw(@RequestBody LoginDto dto)
    {
        String account = dto.getAccount();
        String newPw = dto.getPassword();
        //확인용 콘솔 출력
        System.out.println(account+" "+newPw);
        ResponseEntity<?> result = userService.changePw(account, newPw);
        return result;
    }
}
