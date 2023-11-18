package com.controle.caixa.caixa.repositories;

import com.controle.caixa.caixa.models.ProdutoVendido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoVendidoRepository extends JpaRepository<ProdutoVendido, Long> {
}
