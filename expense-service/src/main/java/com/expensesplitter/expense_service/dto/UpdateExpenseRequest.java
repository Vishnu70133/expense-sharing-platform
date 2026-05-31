package com.expensesplitter.expense_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateExpenseRequest {

    @NotBlank
    private String description;

    @NotNull
    private Double amount;
}