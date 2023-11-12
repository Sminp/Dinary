package com.diary.service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStream;

//이미지를 base64로 인코딩 해줍니다.
@Service
public class ImageService {
    private final ResourceLoader resourceLoader;

    public ImageService(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    public String loadImageAsBase64(String imagePath) {
        try {
            Resource resource = resourceLoader.getResource("classpath:" + imagePath);
            InputStream inputStream = resource.getInputStream();
            byte[] fileBytes = FileCopyUtils.copyToByteArray(inputStream);

            //콘솔 체크
            System.out.print("이미지 바이트배열: ");
            for(byte b: fileBytes)
                System.out.print(b+" ");
            System.out.println(" ");

            //스트링으로 바뀐거 주기
            return java.util.Base64.getEncoder().encodeToString(fileBytes);
        } catch (IOException e) {
            e.printStackTrace();
            return ""; // 에러 발생 시 처리
        }
    }
}
