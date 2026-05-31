package com.expensesplitter.expense_service.controller;

import com.expensesplitter.expense_service.dto.BalanceResponse;
import com.expensesplitter.expense_service.dto.CreateExpenseRequest;
import com.expensesplitter.expense_service.dto.ExpenseResponse;
import com.expensesplitter.expense_service.dto.SettlementResponse;
import com.expensesplitter.expense_service.dto.UpdateExpenseRequest;
import com.expensesplitter.expense_service.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ExpenseResponse createExpense(
            @Valid
            @RequestBody
            CreateExpenseRequest request
    ) {

        return expenseService.createExpense(
                request
        );
    }

    @GetMapping("/groups/{groupId}")
public List<ExpenseResponse> getExpensesByGroup(
        @PathVariable Long groupId
) {

    return expenseService
            .getExpensesByGroup(groupId);
}

@GetMapping("/groups/{groupId}/balances")
public List<BalanceResponse> getBalances(
        @PathVariable Long groupId
) {

    return expenseService.getBalances(
            groupId
    );
}
@GetMapping("/groups/{groupId}/settlements")
public List<SettlementResponse> getSettlements(
        @PathVariable Long groupId
) {

    return expenseService.getSettlements(
            groupId
    );
}
@GetMapping("/{expenseId}")
public ExpenseResponse getExpenseById(
        @PathVariable Long expenseId
) {

    return expenseService.getExpenseById(
            expenseId
    );
}
@PutMapping("/{expenseId}")
public ExpenseResponse updateExpense(
        @PathVariable Long expenseId,
        @Valid
        @RequestBody
        UpdateExpenseRequest request
) {

    return expenseService.updateExpense(
            expenseId,
            request
    );
}

@DeleteMapping("/{expenseId}")
public String deleteExpense(
        @PathVariable Long expenseId
) {

    expenseService.deleteExpense(
            expenseId
    );

    return "Expense deleted successfully";
}
}