package com.expensesplitter.auth_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeEmailRequest {

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String newEmail;
}