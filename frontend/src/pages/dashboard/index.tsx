import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useTable, useSortBy, useGlobalFilter } from "react-table";


interface Product {
  id: number;
  nome: string;
  unidade: string;
  valor: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formState, setFormState] = useState({
    nome: "",
    unidade: "",
    valor: "",
  });


  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => {
      fetchProducts();
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/produtos");
      setProducts(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  const handleShowModal = (product: Product) => {
    setSelectedProduct(product);
    setFormState({
      nome: product.nome,
      unidade: product.unidade,
      valor: product.valor.toString(),
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setFormState({ nome: "", unidade: "", valor: "" });
    setShowModal(false);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSave = async () => {
    if (!selectedProduct) return;

    try {
      await api.put(`/produtos`, { id: selectedProduct.id, ...formState });
      toast.success("Produto atualizado com sucesso!");
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      handleError(error);
    }
  };

  const handleDelete = async (product: Product) => {
    try {
      await api.delete(`/produtos/${product.id}`);
      toast.success("Produto removido com sucesso!");
      fetchProducts();
    } catch (error) {
      handleError(error);
    }
  };

  const handleAdd = async () => {
    try {
      await api.post(`/produtos`, { ...formState });
      toast.success("Produto adicionado com sucesso!");
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      handleError(error);
    }
  }


  const handleError = (error: any) => {
    if (error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        toast.error("Parece que você fez algo errado...");
      } else if (error.response.status >= 500) {
        toast.error("Houve um erro ao concluir a operação...");
      }
    }
  };

  const data = React.useMemo(() => products, [products]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Nome",
        accessor: "nome",
      },
      {
        Header: "Unidade",
        accessor: "unidade",
      },
      {
        Header: "Valor",
        accessor: "valor",
      },
      {
        Header: "Ações",
        accessor: "actions",
        Cell: ({ row }: any) => (
          <div>
            <Button 
            style={{ marginRight: "10px" }}
              variant="primary"
              onClick={() => handleShowModal(row.original)}
            >
              Editar
            </Button>
            <Button variant="danger" onClick={() => handleDelete(row.original)}>
              Remover
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <h1>Produtos</h1>
        <hr />
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Adicionar
        </Button>
      </div>
      <table {...getTableProps()} style={{ width: "100%", margin: "0 auto" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formState.nome}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formProductUnit">
              <Form.Label>Unidade</Form.Label>
              <Form.Control
                type="text"
                name="unidade"
                value={formState.unidade}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formProductValue">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                name="valor"
                value={formState.valor}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formState.nome}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formProductUnit">
              <Form.Label>Unidade</Form.Label>
              <Form.Control
                type="text"
                name="unidade"
                value={formState.unidade}
                onChange={handleFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formProductValue">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                name="valor"
                value={formState.valor}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductsPage;
