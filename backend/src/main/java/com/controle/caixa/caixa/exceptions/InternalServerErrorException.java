package com.controle.caixa.caixa.exceptions;

import java.io.Serial;

public class InternalServerErrorException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public InternalServerErrorException() {
        super("Internal server error");
    }
}
