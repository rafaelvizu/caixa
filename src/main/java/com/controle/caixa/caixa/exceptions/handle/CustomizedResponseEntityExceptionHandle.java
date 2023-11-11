package com.controle.caixa.caixa.exceptions.handle;

import com.controle.caixa.caixa.exceptions.ExceptionResponse;
import com.controle.caixa.caixa.exceptions.ResourceNotFoundException;
import com.controle.caixa.caixa.exceptions.RouteNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;


@ControllerAdvice // para tratar exceções de forma global
@RestController // para retornar um json
public class CustomizedResponseEntityExceptionHandle extends ResponseEntityExceptionHandler {

    // para tratar exceções genéricas
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ExceptionResponse> handleAllExceptions(Exception ex, WebRequest request)
    {
        // cria uma instância de ExceptionResponse
        ExceptionResponse exceptionResponse = new ExceptionResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false)
        );

        // retornar uma resposta com o status 500
        return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // para tratar exceções específicas
    // recurso não encontrado - 404
    @ExceptionHandler(ResourceNotFoundException.class)
    public final ResponseEntity<ExceptionResponse> handleBadRequestExceptions(Exception ex, WebRequest request)
    {
        // cria uma instância de ExceptionResponse
        ExceptionResponse exceptionResponse = new ExceptionResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false)
        );

        // retornar uma resposta com o status 404
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    // rotas não encontradas - 404
    @ExceptionHandler(RouteNotFoundException.class)
    public final ResponseEntity<ExceptionResponse> handleRouteNotFoundExceptions(Exception ex, WebRequest request)
    {
        // cria uma instância de ExceptionResponse
        ExceptionResponse exceptionResponse = new ExceptionResponse(
                new Date(),
                ex.getMessage(),
                request.getDescription(false)
        );

        // retornar uma resposta com o status 404
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

}
