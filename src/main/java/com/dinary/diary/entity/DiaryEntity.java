package com.dinary.diary.entity;

import com.dinary.diary.dto.DiaryDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "diary_table")
public class DiaryEntity extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String diaryTitle;

    @Column(length = 10000)
    private String diaryContents;

    @Column
    private int fileAttached; // 1 or 0

    @OneToMany(mappedBy = "diaryEntity", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<DiaryFileEntity> diaryFileEntityList = new ArrayList<>();

    public static DiaryEntity toSaveEntity(DiaryDTO diaryDTO) {
        DiaryEntity diaryEntity = new DiaryEntity();
        diaryEntity.setDiaryTitle(diaryDTO.getDiaryTitle());
        diaryEntity.setDiaryContents(diaryDTO.getDiaryContents());
        diaryEntity.setFileAttached(0); //파일 없음.
        return diaryEntity;
    }

    public static DiaryEntity toUpdateEntity(DiaryDTO diaryDTO) {
        DiaryEntity diaryEntity = new DiaryEntity();
        diaryEntity.setId(diaryDTO.getId());
        diaryEntity.setDiaryTitle(diaryDTO.getDiaryTitle());
        diaryEntity.setDiaryContents(diaryDTO.getDiaryContents());
        return diaryEntity;

    }

    public static DiaryEntity toSaveFileEntity(DiaryDTO diaryDTO) {
        DiaryEntity diaryEntity = new DiaryEntity();
        diaryEntity.setDiaryTitle(diaryDTO.getDiaryTitle());
        diaryEntity.setDiaryContents(diaryDTO.getDiaryContents());
        diaryEntity.setFileAttached(1);
        return diaryEntity;

    }
}
