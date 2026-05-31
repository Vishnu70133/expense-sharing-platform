package com.expensesplitter.group_service.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(
            GroupNotFoundException.class
    )
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleGroupNotFound(
            GroupNotFoundException ex
    ) {

        return Map.of(
                "error",
                ex.getMessage()
        );
    }

    @ExceptionHandler(
        MemberAlreadyExistsException.class
)
@ResponseStatus(HttpStatus.BAD_REQUEST)
public Map<String, String> handleMemberExists(
        MemberAlreadyExistsException ex
) {

    return Map.of(
            "error",
            ex.getMessage()
    );
}
}