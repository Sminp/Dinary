package com.diary.dto;


import com.diary.Entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
//이미지를 바이트코드로 변환
public class LoginAfDto {
    private byte[] userImage;
    private String userTheme;

    public LoginAfDto(Optional<UserEntity> db) throws IOException {
        String profileName = db.get().getUsrProfile();
        File file = new File("./src/main/resources/profile/"+profileName);

        userImage = Files.readAllBytes(file.toPath());
        userTheme = db.get().getUsrTheme();
    }

}
