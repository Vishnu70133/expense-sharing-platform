package com.expensesplitter.expense_service.client;

import com.expensesplitter.expense_service.config.FeignConfig;
import com.expensesplitter.expense_service.dto.UserProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service",configuration = FeignConfig.class)
public interface UserServiceClient {

    @GetMapping("/profiles/email/{email}")
    UserProfileResponse getProfileByEmail(
            @PathVariable String email
    );
}