package com.expensesplitter.group_service.exception;

public class GroupNotFoundException
        extends RuntimeException {

    public GroupNotFoundException(
            String message
    ) {
        super(message);
    }
}