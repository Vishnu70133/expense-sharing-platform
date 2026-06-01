package com.expensesplitter.group_service.client;

import com.expensesplitter.group_service.config.FeignConfig;
import com.expensesplitter.group_service.dto.UserProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "user-service",
        configuration = FeignConfig.class
)
public interface UserServiceClient {

    @GetMapping("/profiles/email/{email}")
    UserProfileResponse getProfileByEmail(
            @PathVariable String email
    );

    @GetMapping("/profiles/auth-user/{authUserId}")
UserProfileResponse getProfileByAuthUserId(
        @PathVariable Long authUserId
);
}