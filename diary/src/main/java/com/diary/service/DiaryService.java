package com.diary.service;

import com.diary.Entity.DiaryEntity;
import com.diary.Repository.DiaryRepository;
import com.diary.Repository.UserRepository;
import com.diary.dto.RewriteDto;
import com.diary.dto.WriteDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;

    //회원 존재여부 검사도 하기위해서 userRepository를 가져옵니다.
    @Autowired
    public DiaryService(DiaryRepository diaryRepository, UserRepository userRepository) {

        this.diaryRepository = diaryRepository;
        this.userRepository = userRepository;
    }


    //유저의 글쓴것 저장하기
    public ResponseEntity<String> saveWrite(WriteDto write)
    {
        //유저 정보확인
        try{
            String account = write.getAccount();
            if(!userRepository.existsById(account))
                return ResponseEntity.status(404).body("존재하지 않는 유저입니다.");
        }catch(Exception e){
            System.out.println("존재아이디 찾던 중 데이터베이스 오류");
            return ResponseEntity.status(400).body("데이터베이스 오류");
        }
        //유저가 존재한다면 글 쓴거 불러오기
        DiaryEntity de = new DiaryEntity(write);
        try{
            diaryRepository.save(de);
            //혹시라도 리턴할 뭔가 필요해진다면 DTO를 하나만들고 보내는게나음(msg, 필요한거)
            return ResponseEntity.status(200).body("저장 성공!");
        }catch(Exception e){
            System.out.println("저장 오류");
            return ResponseEntity.status(400).body("저장 오류");
        }

    }


    //유저의 글 수정하기
    public ResponseEntity<String> reWrite(RewriteDto rewriteDto){
        //유저 존재정보는 안해도됨, 기존거 수정이라서
        //유저 아이디와 글 아이디를통해 글이 존재하는지 확인해야함
        Long id = rewriteDto.getId();
        String account = rewriteDto.getAccount();
        try {
            Optional<DiaryEntity> de = diaryRepository.findByIdAndUsrId(id, account);
            if(de.isEmpty()){
                System.out.println("찾는 글이 존재하지 않아요");
                return ResponseEntity.status(404).body("찾는 글이 존재하지 않아요");
            }
            DiaryEntity rewriteDiary = de.get();
            rewriteDiary.setTitle(rewriteDto.getTitle());
            rewriteDiary.setBody(rewriteDto.getBody());
            rewriteDiary.setEmoji(rewriteDiary.getEmoji());
            //시간은 + 9시간, 서버가 UTC라서, 환경변수 Asia/seoul해도 안되서 어쩔 수 없다
            rewriteDiary.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now().plusHours(9)));
            //성공
            diaryRepository.save(rewriteDiary);
            return ResponseEntity.status(200).body("수정 성공!!");
        } catch(Exception e){
            System.out.println("글 찾던 중 데이터베이스 오류이거나 저장오류");
            return ResponseEntity.status(400).body("데이터 베이스 오류");
        }

    }
}