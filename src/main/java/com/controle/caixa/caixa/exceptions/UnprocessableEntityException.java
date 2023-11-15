package com.controle.caixa.caixa.exceptions;

import java.io.Serial;

public class UnprocessableEntityException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public UnprocessableEntityException() {
        super("Unprocessable Entity! Check the request body.");
    }
}
