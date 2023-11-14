package com.diary.Entity;

import com.diary.dto.DiaryDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "diary_table")
public class DiaryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 일기 id

    @Column(name = "title", length = 50, nullable = true)
    private String title;

    @Column(name = "body", length = 2000)
    private String body;

    @Column(name = "emoji", length = 20)
    private String emoji;

    @Column(name = "summed", length = 255)
    private String summed = "";

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", insertable = false)
    private LocalDateTime updatedAt;

    @Column(name = "activate")
    private int activate;

    // id, title, body, emoji, summed, createdAt, updatedAt, activate의 생성자 및 메서드 등 추가 가능

    public static DiaryEntity toSaveEntity(DiaryDto diaryDto) {
        DiaryEntity diaryEntity = new DiaryEntity();
        diaryEntity.setId(diaryDto.getId());
        diaryEntity.setTitle(diaryDto.getTitle());
        diaryEntity.setBody(diaryDto.getBody());
        diaryEntity.setEmoji(diaryDto.getEmoji());
        diaryEntity.setSummed(diaryDto.getSummed());
        diaryEntity.setCreatedAt(diaryDto.getCreatedAt());
//        diaryEntity.setUpdatedAt(diaryDto.getUpdatedAt());
//        diaryEntity.setActivate(diaryDto.getActivate());
        return diaryEntity;
    }
}
