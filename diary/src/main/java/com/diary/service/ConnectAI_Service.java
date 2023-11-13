package com.diary.service;

import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;

//이미지를 base64로 인코딩 해줍니다.

public class ConnectAI_Service {
    private RestTemplate restTemplate;
    private String AI_Server_URL;

    public ConnectAI_Service(String flaskServerUrl){
        this.restTemplate = new RestTemplate();
        this.AI_Server_URL = flaskServerUrl;
    }

    public byte[] requestImage(String diary_content){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> requestEntity = new HttpEntity<>(diary_content, headers);
        return restTemplate.postForObject(AI_Server_URL, requestEntity, byte[].class);
    }
}
