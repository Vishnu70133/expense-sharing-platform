package com.expensesplitter.auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CreateProfileRequest {

    private Long authUserId;
    private String email;
    private String fullName;
    private String phone;
}