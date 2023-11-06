package com.dinary.diary.dto;

import com.dinary.diary.entity.DiaryEntity;
import com.dinary.diary.entity.DiaryFileEntity;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DiaryDTO {
    private Long id;
    private String diaryTitle;
    private String diaryContents;

    private LocalDateTime diaryCreatedTime;
    private LocalDateTime diaryUpdateTime;

    private List<MultipartFile> diaryFile; // save.html -> Controller 파일 담는 용도
    private List<String> originalFileName; // 원본 파일 이름
    private List<String> storedFileName; // 서버 저장용 파일 이름
    private int fileAttached; // 파일 첨부 여부(첨부 1, 미첨부 0)


    public DiaryDTO(Long id, String diaryTitle, LocalDateTime diaryCreatedTime) {
        this.id = id;
        this.diaryTitle = diaryTitle;
        this.diaryCreatedTime = diaryCreatedTime;
    }

    public static DiaryDTO toDiaryDTO(DiaryEntity diaryEntity) {
        DiaryDTO diaryDTO = new DiaryDTO();
        diaryDTO.setId(diaryEntity.getId());
        diaryDTO.setDiaryTitle(diaryEntity.getDiaryTitle());
        diaryDTO.setDiaryContents(diaryEntity.getDiaryContents());
        diaryDTO.setDiaryCreatedTime(diaryEntity.getCreatedTime());
        diaryDTO.setDiaryUpdateTime(diaryEntity.getUpdatedTime());
        if (diaryEntity.getFileAttached() == 0) {
            diaryDTO.setFileAttached(diaryEntity.getFileAttached()); // 0
        } else {
            List<String> originalFilNameList = new ArrayList<>();
            List<String> storedFileNameList = new ArrayList<>();
            diaryDTO.setFileAttached(diaryEntity.getFileAttached()); // 1
            for (DiaryFileEntity diaryFileEntity : diaryEntity.getDiaryFileEntityList()) {
                originalFilNameList.add(diaryFileEntity.getOriginalFileName());
                storedFileNameList.add(diaryFileEntity.getStoredFileName());
            }
            diaryDTO.setOriginalFileName(originalFilNameList);
            diaryDTO.setStoredFileName(storedFileNameList);
        }
        return diaryDTO;
    }
}
