package com.expensesplitter.group_service.exception;

public class PendingBalanceException
        extends RuntimeException {

    public PendingBalanceException(
            String message
    ) {
        super(message);
    }
}