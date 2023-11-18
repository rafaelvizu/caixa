package com.controle.caixa.caixa.controllers;

import com.controle.caixa.caixa.exceptions.InternalServerErrorException;
import com.controle.caixa.caixa.exceptions.ResourceNotFoundException;
import com.controle.caixa.caixa.exceptions.RouteNotFoundException;
import com.controle.caixa.caixa.models.ProdutoVendido;
import com.controle.caixa.caixa.repositories.ProdutoVendidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/produtos-vendidos")
public class ProdutoVendidoController {
    @Autowired
    private ProdutoVendidoRepository produtoVendidoRepository;

    // listar todos os produtos vendidos
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ProdutoVendido> index()
    throws InternalServerErrorException
    {
        return produtoVendidoRepository.findAll();
    }

    // listar um produto vendido específico
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ProdutoVendido show( @PathVariable(value = "id") long id )
    throws InternalServerErrorException
    {
        return produtoVendidoRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
    }

    // caso o usuário tente acessar uma rota que não existe
    @RequestMapping(value = "*")
    public void notFound()
    {
        throw new RouteNotFoundException();
    }

}
