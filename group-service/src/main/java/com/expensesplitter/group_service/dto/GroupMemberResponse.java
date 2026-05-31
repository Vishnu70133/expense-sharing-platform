package com.expensesplitter.group_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GroupMemberResponse {

    private Long authUserId;
    private String email;
    private String fullName;
}