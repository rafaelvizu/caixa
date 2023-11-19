import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { Form, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const CadastroVenda = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    api
      .get("/produtos")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => toast.error("Erro ao carregar produtos"));
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.nome.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  const addProduct = (product, quantity) => {
    if (quantity <= 0) {
      toast.error("A quantidade deve ser maior que 0");
      return;
    }

    if (
      selectedProducts.some(
        (selectedProduct) => selectedProduct.id === product.id
      )
    ) {
      toast.error("O produto já foi adicionado");
      return;
    }

    setSelectedProducts([...selectedProducts, { ...product, quantity }]);
  };

  const removeProduct = (id) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== id)
    );
  };

  const submitSale = () => {
    api
      .post(
        "/vendas",
        selectedProducts.map((product) => ({
          id: product.id,
          quantidade: product.quantity,
        }))
      )
      .then((response) => {
        setSelectedProducts([]);
        toast.success("Venda cadastrada com sucesso");
      })
      .catch((error) => toast.error("Erro ao cadastrar venda"));
  };

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>
          Valor Total: R${" "}
          {selectedProducts.reduce(
            (acc, cur) => acc + cur.valor * cur.quantity,
            0
          )}
        </h2>
      </div>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Buscar"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.nome}</td>
              <td>{product.valor}</td>
              <td>
                <Form.Control
                  type="number"
                  min="1"
                  defaultValue="1"
                  id={`quantity-${product.id}`}
                />
              </td>
              <td>
                <Button
                  onClick={() =>
                    addProduct(
                      product,
                      document.getElementById(`quantity-${product.id}`).value
                    )
                  }
                >
                  Adicionar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Produtos selecionados</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.nome}</td>
              <td>{product.valor}</td>
              <td>{product.quantity}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => removeProduct(product.id)}
                >
                  Remover
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button onClick={submitSale}>Cadastrar Venda</Button>
    </div>
  );
};

export default CadastroVenda;
