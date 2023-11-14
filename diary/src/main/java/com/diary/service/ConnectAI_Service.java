package com.diary.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

//ai로부터 이미지를 받아오고 저장합니다.

public class ConnectAI_Service {
    private RestTemplate restTemplate;
    private String AI_Server_URL;

    @Value("${custom.file.path.background}")
    private String backgroundPath;

    public ConnectAI_Service(String flaskServerUrl){
        this.restTemplate = new RestTemplate();
        this.AI_Server_URL = flaskServerUrl;
    }

    public String requestImage(String diary_content){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> requestEntity = new HttpEntity<>(diary_content, headers);
        return restTemplate.postForObject(AI_Server_URL, requestEntity, String.class);
    }

    public void saveImage(byte[] imageBytes, String imageName)
    {
        try{
            String folderPath = "file:"+backgroundPath;
            String filePath = folderPath + imageName;
            File file = new File(filePath);

            //파일이 없다면 생성
            if(!file.exists()){
                file.createNewFile();
            }

            //파일에 이미지데이터 쓰기
            try(FileOutputStream fos = new FileOutputStream(file)){
                fos.write(imageBytes);
            }
        }catch(IOException e){
            e.printStackTrace();
            //파일 저장중 오류
        }
    }
}
