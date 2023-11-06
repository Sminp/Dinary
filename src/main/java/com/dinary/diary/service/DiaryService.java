package com.dinary.diary.service;

import com.dinary.diary.dto.DiaryDTO;
import com.dinary.diary.entity.DiaryEntity;
import com.dinary.diary.entity.DiaryFileEntity;
import com.dinary.diary.repository.DiaryFileRepository;
import com.dinary.diary.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final DiaryFileRepository diaryFileRepository;
    public void save(DiaryDTO diaryDTO) throws IOException {
        if (diaryDTO.getDiaryFile().isEmpty()) {
            //첨부 파일 없음.
            DiaryEntity diaryEntity = DiaryEntity.toSaveEntity(diaryDTO);
            diaryRepository.save(diaryEntity);
        } else {
            //첨부 파일 있음.
            DiaryEntity diaryEntity = DiaryEntity.toSaveFileEntity(diaryDTO);
            Long savedId = diaryRepository.save(diaryEntity).getId();
            DiaryEntity diary = diaryRepository.findById(savedId).get();
            for (MultipartFile diaryFile: diaryDTO.getDiaryFile()) {
                String originalFilename = diaryFile.getOriginalFilename();
                String storedFileName = System.currentTimeMillis() + "_" + originalFilename;
                String savePath = "C:/diarimg/" + storedFileName;
                diaryFile.transferTo(new File(savePath));
                DiaryFileEntity diaryFileEntity = DiaryFileEntity.toDiaryFileEntity(diary, originalFilename, storedFileName);
                diaryFileRepository.save(diaryFileEntity);
            }

        }
    }
    @Transactional
    public List<DiaryDTO> findAll() {
        List<DiaryEntity> diaryEntityList = diaryRepository.findAll();
        List<DiaryDTO> diaryDTOList = new ArrayList<>();
        for (DiaryEntity diaryEntity : diaryEntityList) {
            diaryDTOList.add(DiaryDTO.toDiaryDTO(diaryEntity));
        }
        return diaryDTOList;
    }

    @Transactional
    public DiaryDTO findById(Long id) {
        Optional<DiaryEntity> optionalDiaryEntity = diaryRepository.findById(id);
        if (optionalDiaryEntity.isPresent()) {
            DiaryEntity diaryEntity = optionalDiaryEntity.get();
            DiaryDTO diaryDTO = DiaryDTO.toDiaryDTO(diaryEntity);
            return diaryDTO;
        } else {
            return null;
        }
    }

    public DiaryDTO update(DiaryDTO diaryDTO) {
        DiaryEntity diaryEntity = DiaryEntity.toUpdateEntity(diaryDTO);
        diaryRepository.save(diaryEntity);
        return findById(diaryDTO.getId());
    }

    public void delete(Long id) {
        diaryRepository.deleteById(id);
    }

    public Page<DiaryDTO> paging(Pageable pageable) {
        int page = pageable.getPageNumber()-1;
        int pageLimit = 3;
        Page<DiaryEntity> diaryEntities =
                diaryRepository.findAll(PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "id")));

        System.out.println("diaryEntities.getContent() = " + diaryEntities.getContent());
        System.out.println("diaryEntities.getTotalElements() = " + diaryEntities.getTotalElements());
        System.out.println("diaryEntities.getNumber() = " + diaryEntities.getNumber());
        System.out.println("diaryEntities.getTotalPages() = " + diaryEntities.getTotalPages());
        System.out.println("diaryEntities.getSize() = " + diaryEntities.getSize());
        System.out.println("diaryEntities.hasPrevious() = " + diaryEntities.hasPrevious());
        System.out.println("diaryEntities.isFirst() = " + diaryEntities.isFirst());
        System.out.println("diaryEntities.isLast() = " + diaryEntities.isLast());

        Page<DiaryDTO> diaryDTOS = diaryEntities.map(diary -> new DiaryDTO(diary.getId(), diary.getDiaryTitle(), diary.getCreatedTime()));
        return diaryDTOS;
    }
}
