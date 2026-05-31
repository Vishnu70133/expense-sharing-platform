package com.expensesplitter.expense_service.controller;

import com.expensesplitter.expense_service.client.GroupServiceClient;
import com.expensesplitter.expense_service.dto.GroupMemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {

    private final GroupServiceClient groupServiceClient;

    @GetMapping("/{groupId}")
    public List<GroupMemberResponse> test(
            @PathVariable Long groupId
    ) {

        return groupServiceClient.getMembers(
                groupId
        );
    }
}