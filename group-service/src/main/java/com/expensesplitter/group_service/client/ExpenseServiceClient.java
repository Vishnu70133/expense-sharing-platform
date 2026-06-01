package com.expensesplitter.group_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.expensesplitter.group_service.config.FeignConfig;

@FeignClient(
        name = "expense-service",
        configuration = FeignConfig.class
)

public interface ExpenseServiceClient {

    @GetMapping(
            "/expenses/groups/{groupId}/members/{userId}/balance"
    )
    Double getMemberBalance(
            @PathVariable Long groupId,
            @PathVariable Long userId
    );

    @GetMapping(
        "/expenses/groups/{groupId}/members/{userId}/has-expenses"
)
Boolean hasExpenseHistory(
        @PathVariable Long groupId,
        @PathVariable Long userId
);
}