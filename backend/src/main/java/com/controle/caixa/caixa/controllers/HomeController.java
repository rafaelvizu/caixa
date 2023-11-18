package com.controle.caixa.caixa.controllers;

import com.controle.caixa.caixa.exceptions.RouteNotFoundException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/")
public class HomeController {
    @RequestMapping(value = "/")
    public String index()
    {
        return "{\"message\": \"Welcome to the API\"}";
    }

    // caso a rota não seja encontrada
    @RequestMapping(value = "*")
    public void notFound()
    {
        throw new RouteNotFoundException();
    }
}
