package com.expensesplitter.expense_service.service;

import com.expensesplitter.expense_service.client.GroupServiceClient;
import com.expensesplitter.expense_service.client.UserServiceClient;
import com.expensesplitter.expense_service.dto.BalanceResponse;
import com.expensesplitter.expense_service.dto.CreateExpenseRequest;
import com.expensesplitter.expense_service.dto.ExpenseResponse;
import com.expensesplitter.expense_service.dto.GroupMemberResponse;
import com.expensesplitter.expense_service.dto.SettlementResponse;
import com.expensesplitter.expense_service.dto.UpdateExpenseRequest;
import com.expensesplitter.expense_service.dto.UserProfileResponse;
import com.expensesplitter.expense_service.entity.Expense;
import com.expensesplitter.expense_service.entity.ExpenseSplit;
import com.expensesplitter.expense_service.exception.ResourceNotFoundException;
import com.expensesplitter.expense_service.repository.ExpenseRepository;
import com.expensesplitter.expense_service.repository.ExpenseSplitRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    private final ExpenseSplitRepository expenseSplitRepository;

    private final GroupServiceClient groupServiceClient;

    private final UserServiceClient userServiceClient;

    public ExpenseResponse createExpense(
            CreateExpenseRequest request
    ) {

        List<GroupMemberResponse> members =
                groupServiceClient.getMembers(
                        request.getGroupId()
                );

        int memberCount = members.size();

        double splitAmount =
                request.getAmount() / memberCount;

        String email =
        SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

UserProfileResponse profile =
        userServiceClient
                .getProfileByEmail(email);

Long userId =
        profile.getAuthUserId();

Expense expense =
        Expense.builder()
                .groupId(
                        request.getGroupId()
                )
                .description(
                        request.getDescription()
                )
                .amount(
                        request.getAmount()
                )
                .paidBy(request.getPaidBy())
                .createdAt(
                        LocalDateTime.now()
                )
                .build();

        Expense savedExpense =
                expenseRepository.save(
                        expense
                );

        for (GroupMemberResponse member : members) {

            ExpenseSplit split =
                    ExpenseSplit.builder()
                            .expenseId(
                                    savedExpense.getId()
                            )
                            .userId(
                                    member.getAuthUserId()
                            )
                            .amountOwed(
                                    splitAmount
                            )
                            .build();

            expenseSplitRepository.save(
                    split
            );
        }

        return new ExpenseResponse(
                savedExpense.getId(),
                savedExpense.getGroupId(),
                savedExpense.getDescription(),
                savedExpense.getAmount(),
                savedExpense.getPaidBy()
        );
    }

    public List<ExpenseResponse> getExpensesByGroup(
        Long groupId
) {

    return expenseRepository
            .findByGroupId(groupId)
            .stream()
            .map(expense ->
                    new ExpenseResponse(
                            expense.getId(),
                            expense.getGroupId(),
                            expense.getDescription(),
                            expense.getAmount(),
                            expense.getPaidBy()
                    )
            )
            .toList();
}

public List<BalanceResponse> getBalances(
        Long groupId
) {

    List<Expense> expenses =
            expenseRepository.findByGroupId(
                    groupId
            );

    List<GroupMemberResponse> members =
            groupServiceClient.getMembers(
                    groupId
            );

    int memberCount =
            members.size();

    double totalExpense = 0.0;

    for (Expense expense : expenses) {

        totalExpense +=
                expense.getAmount();
    }

    double sharePerPerson =
            totalExpense / memberCount;

    Map<Long, Double> paidAmounts =
            new HashMap<>();

    for (Expense expense : expenses) {

        paidAmounts.put(
                expense.getPaidBy(),
                paidAmounts.getOrDefault(
                        expense.getPaidBy(),
                        0.0
                ) + expense.getAmount()
        );
    }

    List<BalanceResponse> balances =
            new ArrayList<>();

    for (GroupMemberResponse member : members) {

        double paid =
                paidAmounts.getOrDefault(
                        member.getAuthUserId(),
                        0.0
                );

        double balance =
                paid - sharePerPerson;

        balances.add(
                new BalanceResponse(
                        member.getAuthUserId(),
                        balance
                )
        );
    }

    return balances;
}

public Double getMemberBalance(
        Long groupId,
        Long userId
) {

    List<BalanceResponse> balances =
            getBalances(groupId);

    return balances.stream()
            .filter(balance ->
                    balance.getUserId()
                            .equals(userId)
            )
            .findFirst()
            .map(BalanceResponse::getBalance)
            .orElse(0.0);
}

public List<SettlementResponse> getSettlements(
        Long groupId
) {

    List<BalanceResponse> balances =
            getBalances(groupId);

    List<SettlementResponse> settlements =
            new ArrayList<>();

    List<BalanceResponse> creditors =
            balances.stream()
                    .filter(balance ->
                            balance.getBalance() > 0
                    )
                    .toList();

    List<BalanceResponse> debtors =
            balances.stream()
                    .filter(balance ->
                            balance.getBalance() < 0
                    )
                    .toList();

    for (BalanceResponse debtor : debtors) {

        double amountToPay =
                Math.abs(
                        debtor.getBalance()
                );

        for (BalanceResponse creditor : creditors) {

            if (amountToPay <= 0) {
                break;
            }

            double amountToReceive =
                    creditor.getBalance();

            if (amountToReceive <= 0) {
                continue;
            }

            double settlementAmount =
                    Math.min(
                            amountToPay,
                            amountToReceive
                    );

            settlements.add(
                    new SettlementResponse(
                            debtor.getUserId(),
                            creditor.getUserId(),
                            settlementAmount
                    )
            );

            amountToPay -=
                    settlementAmount;
        }
    }

    return settlements;
}

public ExpenseResponse getExpenseById(
        Long expenseId
) {

    Expense expense =
            expenseRepository
                    .findById(expenseId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Expense not found with id: " + expenseId
                            )
                    );

    return new ExpenseResponse(
            expense.getId(),
            expense.getGroupId(),
            expense.getDescription(),
            expense.getAmount(),
            expense.getPaidBy()
    );
}
public ExpenseResponse updateExpense(
        Long expenseId,
        UpdateExpenseRequest request
) {

    Expense expense =
            expenseRepository
                    .findById(expenseId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Expense not found with id: " + expenseId
                            )
                    );

    expense.setDescription(
            request.getDescription()
    );

    expense.setAmount(
            request.getAmount()
    );
    expense.setPaidBy(request.getPaidBy());

    Expense updatedExpense =
            expenseRepository.save(
                    expense
            );

    expenseSplitRepository.deleteByExpenseId(
            expenseId
    );

    List<GroupMemberResponse> members =
            groupServiceClient.getMembers(
                    expense.getGroupId()
            );

    double splitAmount =
            request.getAmount()
                    / members.size();

    for (GroupMemberResponse member : members) {

        ExpenseSplit split =
                ExpenseSplit.builder()
                        .expenseId(
                                expenseId
                        )
                        .userId(
                                member.getAuthUserId()
                        )
                        .amountOwed(
                                splitAmount
                        )
                        .build();

        expenseSplitRepository.save(
                split
        );
    }

    return new ExpenseResponse(
            updatedExpense.getId(),
            updatedExpense.getGroupId(),
            updatedExpense.getDescription(),
            updatedExpense.getAmount(),
            updatedExpense.getPaidBy()
    );
}
@Transactional
public void deleteExpense(
        Long expenseId
) {

    Expense expense =
            expenseRepository
                    .findById(expenseId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Expense not found with id: "
                                            + expenseId
                            )
                    );

    expenseSplitRepository
            .deleteByExpenseId(
                    expenseId
            );

    expenseRepository
            .delete(expense);
}

public boolean hasExpenseHistory(
        Long groupId,
        Long userId
) {

    return expenseRepository
            .existsByGroupIdAndPaidBy(
                    groupId,
                    userId
            );
}

}