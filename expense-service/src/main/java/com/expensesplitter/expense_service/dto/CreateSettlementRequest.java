package com.expensesplitter.expense_service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateSettlementRequest {

    private Long groupId;

    private Long fromUserId;

    private Long toUserId;

    private Double amount;
}