package com.diary;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DiaryApplication {

    public static void main(String[] args) {
        SpringApplication.run(DiaryApplication.class, args);

/*
        //인공지능 서버와 연결 테스트용
        String Url = "http://10.50.45.227:10011/compute";
        ConnectAI_Service cs = new ConnectAI_Service(Url);
        String diary_content = "df";
        String getImage = cs.requestImage(diary_content);
        System.out.println(getImage);

 */
    }
}
