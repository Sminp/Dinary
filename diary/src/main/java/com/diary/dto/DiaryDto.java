package com.diary.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DiaryDto {
    //    id, title, body, emoji, summed, createdAt
    private Long id;
    private String title;
    private String body;
    private String emoji;
    private String summed = "";
    private LocalDateTime createdAt;
//    private LocalDateTime updatedAt;
}
