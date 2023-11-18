package com.controle.caixa.caixa.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "vendas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Venda implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double valorBruto;

    private double desconto;

    private double valorLiquido;

    @Column(columnDefinition = "boolean default false")
    private boolean cancelada;

    // para o relacionamento com a tabela de produtos vendidos
    @OneToOne(mappedBy = "venda")
    private ProdutoVendido produtoVendido;


}
