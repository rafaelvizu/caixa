package com.controle.caixa.caixa.controllers;

import com.controle.caixa.caixa.dto.ProdutoCompradoDTO;
import com.controle.caixa.caixa.dto.VendaCompletaDTO;
import com.controle.caixa.caixa.exceptions.InternalServerErrorException;
import com.controle.caixa.caixa.exceptions.ResourceNotFoundException;
import com.controle.caixa.caixa.exceptions.RouteNotFoundException;
import com.controle.caixa.caixa.exceptions.UnprocessableEntityException;
import com.controle.caixa.caixa.models.Produto;
import com.controle.caixa.caixa.models.ProdutoVendido;
import com.controle.caixa.caixa.models.Venda;
import com.controle.caixa.caixa.repositories.ProdutoRepository;
import com.controle.caixa.caixa.repositories.ProdutoVendidoRepository;
import com.controle.caixa.caixa.repositories.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/vendas")
public class VendaController {
    @Autowired
    private VendaRepository vendaRepository;
    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private ProdutoVendidoRepository produtoVendidoRepository;


    // listar todas as vendas
    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Venda> index()
    throws InternalServerErrorException
    {
        return vendaRepository.findAll();
    }

    // mostrar uma venda
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Venda show(@PathVariable Long id)
    throws InternalServerErrorException, ResourceNotFoundException
    {
        return vendaRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

    }

    // criar uma venda
    @RequestMapping(
            value = "",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public VendaCompletaDTO create(@RequestBody List<ProdutoCompradoDTO> produtosCompradosDTO)
    throws InternalServerErrorException
    {
        // verifica se a lista de produtos está vazia
        if (produtosCompradosDTO.isEmpty())
        {
            throw new UnprocessableEntityException();
        }

        for (int i = 0; i < produtosCompradosDTO.size(); i++)
        {
            // verifica se a quantidade é menor ou igual a zero
            if (produtosCompradosDTO.get(i).getQuantidade() <= 0)
            {
                throw new UnprocessableEntityException();
            }

            // verificar se há produtos duplicados
            for (int j = i + 1; j < produtosCompradosDTO.size(); j++)
            {
                if (Objects.equals(produtosCompradosDTO.get(i).getId(), produtosCompradosDTO.get(j).getId()))
                {
                    throw new UnprocessableEntityException();
                }
            }
        }

        // verifica se os produtos existem
        for (ProdutoCompradoDTO produtosComprados : produtosCompradosDTO)
        {
            if (produtoRepository.findById(produtosComprados.getId()).isEmpty())
            {
                throw new ResourceNotFoundException();
            }
        }

        // criar venda
        Venda venda = new Venda();
        venda.setValorLiquido(0);
        venda.setValorBruto(0);
        venda.setCancelada(false);

        double valorBruto = 0;


        List<ProdutoVendido> produtosVendidos = new ArrayList<>();
        for (ProdutoCompradoDTO produtosComprados : produtosCompradosDTO)
        {
            Produto produto = produtoRepository.findById(produtosComprados.getId()).orElseThrow(ResourceNotFoundException::new);

            ProdutoVendido produtoVendido = new ProdutoVendido();
            produtoVendido.setNome(produto.getNome());
            produtoVendido.setUnidade(produto.getUnidade());
            produtoVendido.setValorUnitario(produto.getValor());
            produtoVendido.setValorTotal(produto.getValor() * produtosComprados.getQuantidade());
            produtoVendido.setQuantidade(produtosComprados.getQuantidade());
            produtoVendido.setVenda(venda);
            produtoVendido.setProduto(produto);

            valorBruto += produtoVendido.getValorTotal();

            produtosVendidos.add(produtoVendido);
        }

        venda.setValorBruto(valorBruto);
        venda.setValorLiquido(valorBruto);
        vendaRepository.save(venda);
        produtoVendidoRepository.saveAll(produtosVendidos);

        return new VendaCompletaDTO(venda, produtosVendidos);
    }

    // cancelar uma venda
    @RequestMapping(value = "/{id}/cancelar", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public Venda cancelar(@PathVariable Long id)
    throws InternalServerErrorException, ResourceNotFoundException
    {
        Venda venda = vendaRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        if (venda.isCancelada())
        {
            throw new UnprocessableEntityException();
        }

        venda.setCancelada(true);
        vendaRepository.save(venda);

        return venda;
    }

    // desfazer o cancelamento de uma venda
    @RequestMapping(value = "/{id}/desfazer-cancelamento", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public Venda desfazerCancelamento(@PathVariable Long id)
    throws InternalServerErrorException, ResourceNotFoundException
    {
        Venda venda = vendaRepository.findById(id).orElseThrow(ResourceNotFoundException::new);

        if (!venda.isCancelada())
        {
            throw new UnprocessableEntityException();
        }

        venda.setCancelada(false);
        vendaRepository.save(venda);

        return venda;
    }


    // caso o usuário tente acessar uma rota que não existe
    @RequestMapping(value = "*")
    public void notFound()
    {
        throw new RouteNotFoundException();
    }
}
