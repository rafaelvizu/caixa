package com.controle.caixa.caixa.controller;

import com.controle.caixa.caixa.exceptions.ResourceNotFoundException;
import com.controle.caixa.caixa.exceptions.RouteNotFoundException;
import com.controle.caixa.caixa.models.User;
import com.controle.caixa.caixa.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<User> index()
    {
        List<User> users = userRepository.findAll();
        return users;
    }


    // caso o usuário tente acessar uma rota que não existe
    @RequestMapping(value = "*")
    public void notFound()
    {
        throw new RouteNotFoundException();
    }


}
