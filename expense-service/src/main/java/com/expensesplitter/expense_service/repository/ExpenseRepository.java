package com.expensesplitter.expense_service.repository;

import com.expensesplitter.expense_service.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository
        extends JpaRepository<Expense, Long> {

    List<Expense> findByGroupId(
            Long groupId
    );
    boolean existsByGroupIdAndPaidBy(
        Long groupId,
        Long paidBy
);
    
}