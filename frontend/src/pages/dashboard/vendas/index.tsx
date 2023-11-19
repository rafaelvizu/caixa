import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import {
  Table,
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { FiRefreshCw, FiXCircle } from "react-icons/fi";

const SalesScreen = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (sale) => {
    setSelectedSale(sale);
    setShow(true);
  };

  useEffect(() => {
    api
      .get("/vendas")
      .then((response) => {
        setSales(response.data);
        setFilteredSales(response.data);
      })
      .catch((error) => toast.error("Erro ao carregar vendas"));
  }, []);

  useEffect(() => {
    setFilteredSales(
      sales.filter((sale) =>
        sale.produtosVendidos.some((product) =>
          product.nome.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, sales]);

  const cancelSale = (id) => {
    api
      .put(`/vendas/${id}/cancelar`)
      .then((response) => {
        setSales(sales.map((sale) => (sale.id === id ? response.data : sale)));
        toast.success("Venda cancelada com sucesso");
      })
      .catch((error) => toast.error("Erro ao cancelar venda"));
  };

  const undoCancellation = (id) => {
    api
      .put(`/vendas/${id}/desfazer-cancelamento`)
      .then((response) => {
        setSales(sales.map((sale) => (sale.id === id ? response.data : sale)));
        toast.success("Cancelamento desfeito com sucesso");
      })
      .catch((error) => toast.error("Erro ao desfazer cancelamento"));
  };

  return (
    <div className="container p-4">
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Pesquisar</InputGroup.Text>
        <FormControl
          placeholder="Nome do produto"
          aria-label="Search"
          aria-describedby="basic-addon1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Valor Bruto</th>
            <th>Valor Líquido</th>
            <th>Cancelada</th>
            <td>Data</td>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.valorBruto}</td>
              <td>{sale.valorLiquido}</td>
              <td>{sale.cancelada ? "Sim" : "Não"}</td>
              <td>{new Date(sale.dataVenda).toLocaleDateString()}</td>
              <td>
                <Button variant="primary" onClick={() => handleShow(sale)}>
                  Ver Produtos
                </Button>
                {sale.cancelada ? (
                  <Button
                    variant="success"
                    onClick={() => undoCancellation(sale.id)}
                  >
                    <FiRefreshCw />
                  </Button>
                ) : (
                  <Button variant="danger" onClick={() => cancelSale(sale.id)}>
                    <FiXCircle />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Produtos Vendidos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSale &&
            selectedSale.produtosVendidos.map((product) => (
              <div key={product.id} className="mb-4">
                <p>
                  <strong>Nome: </strong>
                  {product.nome}
                </p>
                <p>
                  <strong>Valor: </strong>
                  {product.valorUnitario}
                </p>
                <p>
                  <strong>Quantidade: </strong>
                  {product.quantidade}
                </p>
                <p>
                    <strong>Valor Total: </strong>
                    {product.valorTotal}
                    </p>
                <hr className="my-4"/>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default SalesScreen;
