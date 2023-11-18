package com.controle.caixa.caixa.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "produtos_vendidos")
@Setter
public class ProdutoVendido implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    private String nome;
    @Getter
    private String unidade;
    @Getter
    private double valorUnitario;
    @Getter
    private double valorTotal;
    @Getter
    private double quantidade;

    @ManyToOne
    @JoinColumn(name = "venda_id")
    private Venda venda;

    @Getter
    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;


}
