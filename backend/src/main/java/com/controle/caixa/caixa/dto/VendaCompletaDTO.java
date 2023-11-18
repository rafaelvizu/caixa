package com.controle.caixa.caixa.dto;

import com.controle.caixa.caixa.models.ProdutoVendido;
import com.controle.caixa.caixa.models.Venda;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class VendaCompletaDTO {
    private Venda venda;
    private List<ProdutoVendido> produtoVendido;

    public VendaCompletaDTO(Venda venda, List<ProdutoVendido> produtoVendido) {
        this.venda = venda;
        this.produtoVendido = produtoVendido;
    }

}
