package com.diary.Repository;

import com.diary.Entity.DiaryEntity;
import com.diary.dto.ReturnDiaryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Repository
public interface DiaryRepository extends JpaRepository<DiaryEntity, Long> {
    //글 아이디와 유저아이디로 글을 찾고 불러옴.
    Optional<DiaryEntity> findByIdAndUsrId(Long id, String usrId);

    @Query("SELECT d FROM DiaryEntity d WHERE d.usrId = :usrId AND YEAR(d.createdAt) = :x AND MONTH(d.createdAt) = :y AND d.activate = :activate")
    Optional<List<DiaryEntity>> findByUsrIdAndCreatedAtYearAndCreatedAtMonthAndActivate(
            @Param("usrId") String usrId,
            @Param("x") int x,
            @Param("y") int y,
            @Param("activate") int activate
    );

    default Optional<List<ReturnDiaryDto>> findReturnDiaryDtoByUsrIdAndCreatedAtYearAndCreatedAtMonthAndActivate(
            String usrId, int x, int y, int activate
    ) {
        return findByUsrIdAndCreatedAtYearAndCreatedAtMonthAndActivate(usrId, x, y, activate)
                .map(diaryEntities -> diaryEntities.stream()
                        .map(diaryEntity -> new ReturnDiaryDto(diaryEntity.getId(), diaryEntity.getEmoji(), diaryEntity.getCreatedAt().toLocalDate().getDayOfMonth()))
                        .collect(Collectors.toList())
                );
    }
}
