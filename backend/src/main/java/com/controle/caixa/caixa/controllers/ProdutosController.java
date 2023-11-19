package com.controle.caixa.caixa.controllers;

import com.controle.caixa.caixa.exceptions.InternalServerErrorException;
import com.controle.caixa.caixa.exceptions.ResourceNotFoundException;
import com.controle.caixa.caixa.exceptions.RouteNotFoundException;
import com.controle.caixa.caixa.exceptions.UnprocessableEntityException;
import com.controle.caixa.caixa.helpers.Validacoes;
import com.controle.caixa.caixa.models.Produto;
import com.controle.caixa.caixa.repositories.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/produtos")
@CrossOrigin(origins = "*")
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
    public Produto show(@PathVariable(value = "id") long id)
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
    public Produto create(@RequestBody Produto produto)
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
    public Produto update(@RequestBody Produto produtoUpdate)
    throws InternalServerErrorException
    {
        Produto produto = produtoRepository.findById(produtoUpdate.getId()).orElseThrow(ResourceNotFoundException::new);

        if (!Validacoes.validarProduto(produtoUpdate))
        {
            throw new UnprocessableEntityException();
        }

        return produtoRepository.save(produtoUpdate);
    }

    // deletar um produto
    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public Produto delete(@PathVariable(value = "id") long id)
    throws InternalServerErrorException
    {
        Produto produto = produtoRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        produtoRepository.delete(produto);

        return produto;
    }

    // caso o usuário tente acessar uma rota que não existe
    @RequestMapping(value = "*")
    public void notFound()
    {
        throw new RouteNotFoundException();
    }


}
