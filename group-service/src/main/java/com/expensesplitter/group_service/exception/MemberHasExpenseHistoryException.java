package com.expensesplitter.group_service.exception;

public class MemberHasExpenseHistoryException
        extends RuntimeException {

    public MemberHasExpenseHistoryException(
            String message
    ) {
        super(message);
    }
}