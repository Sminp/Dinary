package com.diary.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

//ai로부터 이미지를 받아오고 저장합니다.

@Service
public class ConnectAI_Service {
    private final RestTemplate restTemplate;

    public ConnectAI_Service(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    public byte[] downloadImage(String URL, String diary_content) throws IOException{
        System.out.println("곧 보냅니다");
        ResponseEntity<byte[]> responseEntity = restTemplate.postForEntity(URL, diary_content, byte[].class);
        System.out.println("받기 완료!");
        return responseEntity.getBody();
    }

}
