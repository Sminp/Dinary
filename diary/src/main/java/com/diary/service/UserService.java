package com.diary.service;

import com.diary.Entity.UserEntity;
import com.diary.Repository.UserRepository;
import com.diary.dto.LoginAfDto;
import com.diary.dto.LoginDto;
import com.diary.dto.SignInResponseDto;
import com.diary.dto.SignUpDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;
//UserController 에 대한 기능 구현

@Service
public class UserService {

    @Autowired UserRepository userRepository;
    public ResponseEntity<?> signUp(SignUpDto dto) {
        //id 중복확인
        String inputid = dto.getAccount();
        try{
            if(userRepository.existsById(inputid))
                return ResponseEntity.status(404).body("이미 가입한 아이디입니다");
        }catch(Exception e){
            return ResponseEntity.status(400).body("데이터 베이스 오류");
        }

        //UserEntity 생성
        UserEntity userEntity = new UserEntity(dto);

        //UserRepository를 이용해서 데이터베이스에 Entity 저장
        try{
            userRepository.save(userEntity);
        } catch (Exception e){
            return ResponseEntity.status(400).body("데이터베이스 오류");
        }

        //가입 성공!
        return ResponseEntity.status(200).body("가입 성공!");
    }

    //로그인 서비스
    public ResponseEntity<SignInResponseDto> logIn(LoginDto dto){
        String userId = dto.getAccount(); //입력받은 아이디
        String userPw = dto.getPassword(); //입력받은 비밀번호
        String message;
        //Id Pw가 일치하는게 있다면 existUser = true
        boolean existUser = userRepository.existsByUsrIdAndUsrPw(userId, userPw);

        try {
            if(!existUser) {
                String auth = null;
                message = "존재하지 않는 아이디나 비밀번호";
                SignInResponseDto signInResponseDto = new SignInResponseDto(auth, message);
                return ResponseEntity.status(404).body(signInResponseDto);
            }
        }catch (Exception error){
            String auth = null;
            message = "데이터베이스 오류";
            SignInResponseDto signInResponseDto = new SignInResponseDto(auth, message);
            return ResponseEntity.status(400).body(signInResponseDto);
        }

        try {
            UserEntity userEntity = userRepository.findById(userId).get();

            userEntity.setUsrPw("");
            String auth = "success";
            message = "로그인 성공";
            //int exprTime = 3600000;

            SignInResponseDto signInResponseDto = new SignInResponseDto(auth, message);
            return ResponseEntity.status(200).body(signInResponseDto);
        }catch (Exception error){
            String auth = null;
            message = "데이터베이스 오류";
            SignInResponseDto signInResponseDto = new SignInResponseDto(auth, message);
            return ResponseEntity.status(400).body(signInResponseDto);
        }

    }

    //로그인시 정보 가져오기
    public ResponseEntity<LoginAfDto> logInAf(String id)
    {
        try{
            Optional<UserEntity> userEntity = userRepository.findById(id);
            LoginAfDto res = new LoginAfDto(userEntity);


            return ResponseEntity.status(200).body(res);
        }catch(Exception error){
            LoginAfDto resfail = new LoginAfDto();
            return ResponseEntity.status(400).body(resfail);
        }
    }
}
