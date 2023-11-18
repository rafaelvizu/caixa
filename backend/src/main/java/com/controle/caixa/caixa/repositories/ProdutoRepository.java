package com.controle.caixa.caixa.repositories;

import com.controle.caixa.caixa.models.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
