package com.expensesplitter.group_service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileResponse {

    private Long id;

    private Long authUserId;

    private String email;

    private String fullName;

    private String phone;
}