package com.controle.caixa.caixa.dto;

import com.controle.caixa.caixa.models.ProdutoVendido;
import com.controle.caixa.caixa.models.Venda;

import java.util.List;

public class VendasCompletaDTO {
    private List<Venda> vendas;
    private List<ProdutoVendido> produtosComprados;

    public VendasCompletaDTO(List<Venda> vendas, List<ProdutoVendido> produtosComprados) {
        this.vendas = vendas;
        this.produtosComprados = produtosComprados;
    }

}
