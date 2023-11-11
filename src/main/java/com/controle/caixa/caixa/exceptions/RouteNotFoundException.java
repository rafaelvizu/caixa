package com.controle.caixa.caixa.exceptions;

import java.io.Serial;

public class RouteNotFoundException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public RouteNotFoundException() {
        super("Route not found");
    }
}
