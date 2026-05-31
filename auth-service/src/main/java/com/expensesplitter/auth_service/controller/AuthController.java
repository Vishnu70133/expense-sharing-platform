package com.expensesplitter.auth_service.controller;

import com.expensesplitter.auth_service.dto.AuthResponse;
import com.expensesplitter.auth_service.dto.ChangeEmailRequest;
import com.expensesplitter.auth_service.dto.ChangePasswordRequest;
import com.expensesplitter.auth_service.dto.LoginRequest;
import com.expensesplitter.auth_service.dto.RegisterRequest;
import com.expensesplitter.auth_service.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(
            @Valid @RequestBody RegisterRequest request
    ) {
        return authService.register(request);
    }
    @PostMapping("/login")
    public AuthResponse login(
            @Valid
            @RequestBody
            LoginRequest request
    ) {
        return authService.login(request);
    }
    @GetMapping("/test")
public String test() {
    return "JWT Test Endpoint";
}

@GetMapping("/me")
public String getCurrentUser() {

    return SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();
}

@PutMapping("/password")
public String changePassword(
        @Valid
        @RequestBody
        ChangePasswordRequest request
) {

    authService.changePassword(
            request
    );

    return "Password updated successfully";
}

@PutMapping("/email")
public String changeEmail(
        @Valid
        @RequestBody
        ChangeEmailRequest request
) {

    authService.changeEmail(request);

    return "Email updated successfully";
}
}