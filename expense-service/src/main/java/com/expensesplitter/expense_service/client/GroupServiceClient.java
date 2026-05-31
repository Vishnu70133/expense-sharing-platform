package com.expensesplitter.expense_service.client;

import com.expensesplitter.expense_service.dto.GroupMemberResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "group-service")
public interface GroupServiceClient {

    @GetMapping("/groups/{groupId}/members")
    List<GroupMemberResponse> getMembers(
            @PathVariable Long groupId
    );
}