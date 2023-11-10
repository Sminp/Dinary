package com.diary.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor(staticName="set")//new로 생성하지 않고 set을 사용
public class ResponseDto<D> {
    private boolean result;
    private String message;
    private D data;

    //성공관련 인스턴스 만들어주는 메소드
    public static <D> ResponseDto<D> setSuccess(String message, D data) {
        return ResponseDto.set(true, message, data);
    }

    //실패관련 인스턴스 만들어주는 메소드
    public static <D> ResponseDto<D> setFailed(String message) {
        return ResponseDto.set(false,message,null);
    }
}
