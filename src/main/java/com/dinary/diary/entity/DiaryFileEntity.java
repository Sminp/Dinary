package com.dinary.diary.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "diary_file_table")
public class DiaryFileEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String originalFileName;

    @Column
    private String storedFileName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id")
    private DiaryEntity diaryEntity;

    public static DiaryFileEntity toDiaryFileEntity(DiaryEntity diaryEntity, String originalFileName, String storedFileName)
    {
        DiaryFileEntity diaryFileEntity = new DiaryFileEntity();
        diaryFileEntity.setOriginalFileName(originalFileName);
        diaryFileEntity.setStoredFileName(storedFileName);
        diaryFileEntity.setDiaryEntity(diaryEntity);
        return diaryFileEntity;
    }
}
