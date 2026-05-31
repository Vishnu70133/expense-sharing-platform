package com.expensesplitter.expense_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExpenseResponse {

    private Long id;

    private Long groupId;

    private String description;

    private Double amount;

    private Long paidBy;
}