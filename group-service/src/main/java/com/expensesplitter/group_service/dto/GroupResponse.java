package com.expensesplitter.group_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GroupResponse {

    private Long id;
    private String name;
    private Long createdBy;
}