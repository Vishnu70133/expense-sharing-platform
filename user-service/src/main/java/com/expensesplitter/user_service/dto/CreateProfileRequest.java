package com.expensesplitter.user_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProfileRequest {

    private Long authUserId;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String fullName;

    private String phone;
}