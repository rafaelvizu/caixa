package com.controle.caixa.caixa.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

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

    @Temporal(TemporalType.TIMESTAMP)
    private Date dataVenda;

    @PrePersist
    public void onCreate() {
        this.dataVenda = new Date();
    }

    @Column(columnDefinition = "boolean default false")
    private boolean cancelada;

    // para cada venda, existem 1 ou mais produtos vendidos
    @OneToMany(mappedBy = "venda", cascade = CascadeType.ALL)
    private List<ProdutoVendido> produtosVendidos;


}
