package com.diary.Repository;

import com.diary.Entity.DiaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface DiaryRepository extends JpaRepository<DiaryEntity, Long> {
    //글 아이디와 유저아이디로 글을 찾고 불러옴.
    Optional<DiaryEntity> findByIdAndUsrId(Long id, String usrId);
}
