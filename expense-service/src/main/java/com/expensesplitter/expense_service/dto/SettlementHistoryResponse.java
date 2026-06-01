package com.expensesplitter.expense_service.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class SettlementHistoryResponse {

    private Long id;

    private Long fromUserId;

    private Long toUserId;

    private Double amount;

    private LocalDateTime settledAt;
}