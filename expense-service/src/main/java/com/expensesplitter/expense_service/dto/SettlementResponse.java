package com.expensesplitter.expense_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SettlementResponse {

    private Long fromUserId;

    private Long toUserId;

    private Double amount;
}