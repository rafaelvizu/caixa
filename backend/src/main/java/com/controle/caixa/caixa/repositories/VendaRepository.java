package com.controle.caixa.caixa.repositories;

import com.controle.caixa.caixa.models.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {
}
