package com.controle.caixa.caixa.repositories;

import com.controle.caixa.caixa.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.math.BigInteger;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
