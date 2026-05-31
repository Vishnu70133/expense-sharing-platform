package com.expensesplitter.expense_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BalanceResponse {

    private Long userId;

    private Double balance;
}