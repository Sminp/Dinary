package com.dinary.diary.repository;

import com.dinary.diary.entity.DiaryFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryFileRepository extends JpaRepository<DiaryFileEntity, Long> {

}
