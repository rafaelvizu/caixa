package com.controle.caixa.caixa.controller;

import com.controle.caixa.caixa.exceptions.InternalServerErrorException;
import com.controle.caixa.caixa.exceptions.ResourceNotFoundException;
import com.controle.caixa.caixa.exceptions.RouteNotFoundException;
import com.controle.caixa.caixa.exceptions.UnprocessableEntityException;
import com.controle.caixa.caixa.models.Venda;
import com.controle.caixa.caixa.repositories.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/vendas")
public class VendaController {
    @Autowired
    private VendaRepository vendaRepository;

    @RequestMapping(value = "/", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<Venda> index() throws InternalServerErrorException
    {
        List<Venda> vendas = vendaRepository.findAll();
        return vendas;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Venda show(
            @PathVariable(value = "id") Long id
    ) throws InternalServerErrorException
    {
        Venda venda = vendaRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        return venda;
    }

    @RequestMapping(value = "/", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public Venda store(
            HttpEntity<Venda> httpEntity
    ) throws InternalServerErrorException {
        Venda venda = httpEntity.getBody();
        venda.setId(null);

        if (venda.getValorBruto() < 0)
        {
            throw new UnprocessableEntityException();
        }
        else if (venda.getDesconto() < 0)
        {
            throw new UnprocessableEntityException();
        }
        else if (venda.getDesconto() > venda.getValorBruto())
        {
            throw new UnprocessableEntityException();
        }

        venda.setValorLiquido(venda.getValorBruto() - venda.getDesconto());
        venda.setCancelada(false);

        vendaRepository.save(venda);
        return venda;
    }


    @RequestMapping(value = "/{id}", method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public Venda update(
            @PathVariable(value = "id") Long id,
            HttpEntity<Venda> httpEntity
    ) throws InternalServerErrorException
    {
        Venda venda = vendaRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
        Venda vendaBody = httpEntity.getBody();

        if (vendaBody.getValorBruto() < 0)
        {
            throw new UnprocessableEntityException();
        }
        else if (vendaBody.getDesconto() < 0)
        {
            throw new UnprocessableEntityException();
        }
        else if (vendaBody.getDesconto() > vendaBody.getValorBruto())
        {
            throw new UnprocessableEntityException();
        }

        venda.setValorBruto(vendaBody.getValorBruto());
        venda.setDesconto(vendaBody.getDesconto());
        venda.setValorLiquido(vendaBody.getValorBruto() - vendaBody.getDesconto());

        vendaRepository.save(venda);

        return venda;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Venda destroy(
            @PathVariable(value = "id") Long id
    ) throws InternalServerErrorException
    {
        Venda venda = vendaRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        vendaRepository.delete(venda);

        return venda;
    }



    // caso o usuário tente acessar uma rota que não existe
    @RequestMapping(value = "*")
    public void notFound()
    {
        throw new RouteNotFoundException();
    }
}
