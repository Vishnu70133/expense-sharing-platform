package com.expensesplitter.user_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProfileResponse {

    private Long id;
    private Long authUserId;
    private String email;
    private String fullName;
    private String phone;
}