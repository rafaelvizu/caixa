// tela de home do dashboard
import React from "react";
import { Container } from "react-bootstrap";
import { FaHome } from "react-icons/fa";


const Home = () => {
  return (
    <Container className="p-5">
      <h1 className="display-3">Olá,</h1>
      <p className="lead">
          Seja bem vindo ao sistema de controle de vendas
      </p>
      <hr className="my-4" />

     <p>
          Para acessar as funcionalidades do sistema, utilize o menu superior para navegar entre as telas. <FaHome />
     </p>

    </Container>
  );
};

export default Home;