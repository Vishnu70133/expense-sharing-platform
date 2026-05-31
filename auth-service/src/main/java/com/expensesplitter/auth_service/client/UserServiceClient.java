package com.expensesplitter.auth_service.client;

import com.expensesplitter.auth_service.dto.CreateProfileRequest;
import com.expensesplitter.auth_service.dto.UpdateEmailRequest;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service")
public interface UserServiceClient {

    @PostMapping("/profiles")
    void createProfile(
            @RequestBody
            CreateProfileRequest request
    );
    @PutMapping("/profiles/internal/email")
    String updateEmail(
            @RequestBody
            UpdateEmailRequest request
    );
}