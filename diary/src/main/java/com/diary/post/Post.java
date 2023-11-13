package com.diary.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    byte[] responsee;
    public void sendPostRequest() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "10.50.45.15:10011/compute";
        String requestBody = "요청";

        ResponseEntity<byte[]> response = restTemplate.postForEntity(url, requestBody, byte[].class);
        responsee = response.getBody();
    }

}
