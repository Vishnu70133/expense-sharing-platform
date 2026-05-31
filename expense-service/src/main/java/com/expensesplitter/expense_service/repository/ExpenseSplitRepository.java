package com.expensesplitter.expense_service.repository;

import com.expensesplitter.expense_service.entity.ExpenseSplit;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;

public interface ExpenseSplitRepository
        extends JpaRepository<ExpenseSplit, Long> {

    List<ExpenseSplit> findByExpenseId(
            Long expenseId
    );

    List<ExpenseSplit> findByUserId(
            Long userId
    );
    @Modifying
    @Transactional
    void deleteByExpenseId(Long expenseId);
}