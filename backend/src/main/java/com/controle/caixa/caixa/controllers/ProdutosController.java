package com.controle.caixa.caixa.controllers;

import com.controle.caixa.caixa.exceptions.InternalServerErrorException;
import com.controle.caixa.caixa.exceptions.RouteNotFoundException;
import com.controle.caixa.caixa.exceptions.UnprocessableEntityException;
import com.controle.caixa.caixa.helpers.Validacoes;
import com.controle.caixa.caixa.models.Produto;
import com.controle.caixa.caixa.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/produtos")
public class ProdutosController {
    @Autowired
    private ProdutoRepository produtoRepository;

    // listar todos os produtos
    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Produto> index()
    throws InternalServerErrorException
    {
        return produtoRepository.findAll();
    }

    // Listar um produto específico
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Produto show(Long id)
    throws InternalServerErrorException
    {
        return produtoRepository.findById(id).orElseThrow(InternalServerErrorException::new);
    }

    // criar um produto
    @RequestMapping(
            value = "",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public Produto create(Produto produto)
    throws InternalServerErrorException
    {
        if (!Validacoes.validarProduto(produto))
        {
            throw new UnprocessableEntityException();
        }

        return produtoRepository.save(produto);
    }

    // atualizar um produto
    @RequestMapping(
            value = "",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public Produto update(Produto produto)
    throws InternalServerErrorException
    {
        if (!Validacoes.validarProduto(produto))
        {
            throw new UnprocessableEntityException();
        }

        return produtoRepository.save(produto);
    }

    // deletar um produto
    @RequestMapping(
            value = "",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void delete(Produto produto)
    throws InternalServerErrorException
    {
        produtoRepository.delete(produto);
    }

    // caso o usuário tente acessar uma rota que não existe
    @RequestMapping(value = "*")
    public void notFound()
    {
        throw new RouteNotFoundException();
    }


}
