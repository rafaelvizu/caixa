import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useTable, useSortBy, useGlobalFilter } from "react-table";


interface Product {
  id: number;
  nome: string;
  unidade: string;
  valor: number;
}

const Table = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [show, setShow] = useState(false);
  const [nome, setNome] = useState("");
  const [unidade, setUnidade] = useState("");
  const [valor, setValor] = useState(0);
  const [id, setId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // atualizar a tabela a cada 20 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      getProducts();
    }, 10000);
    return () => clearInterval(interval);
  }, []);


  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        sortType: "basic",
      },
      {
        Header: "Nome",
        accessor: "nome",
        sortType: "basic",
      },
      {
        Header: "Unidade",
        accessor: "unidade",
        sortType: "basic",
      },
      {
        Header: "Valor",
        accessor: "valor",
        sortType: "basic",
      },
      {
        Header: "Ações",
        accessor: "acoes",
        Cell: (props: any) => {
          return (
            <div>
              <Button
                variant="warning"
                size="sm"
                onClick={() => {
                  setId(props.row.original.id);
                  setNome(props.row.original.nome);
                  setUnidade(props.row.original.unidade);
                  setValor(props.row.original.valor);
                  handleShow();
                }}
              >
                Editar
              </Button>{" "}
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  handleDelete(props.row.original.id);
                }}
              >
                Excluir
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const data = React.useMemo(() => products, [products]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    const response = await api.get("/produtos");
    setProducts(response.data);
  }

  async function handleDelete(id: number) {
    await api.delete(`/produtos/${id}`);
    toast.success("Produto excluído com sucesso!");
    getProducts();
  }

  async function handleUpdate(e: any) {
    e.preventDefault();
    const data = {
      id,
      nome,
      unidade,
      valor,
    };
    await api.put(`/produtos`, data);
    toast.success("Produto atualizado com sucesso!");
    getProducts();
    handleClose();
  }

  async function handleCreate(e: any) {
    e.preventDefault();
    const data = {
      nome,
      unidade,
      valor,
    };
    await api.post("/produtos", data);
    toast.success("Produto cadastrado com sucesso!");
    getProducts();
    handleClose();
  }

  const handleFilterChange = (e: any) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
  };

  const handleClear = () => {
    setGlobalFilter("");
  }

  const handleClearButton = () => {
    return (
      <Button variant="danger" size="sm" onClick={handleClear}>
        Limpar
      </Button>
    );
  }

  const handleFilter = () => {
    return (
      <Form.Control
        type="text"
        value={globalFilter || ""}
        onChange={handleFilterChange}
        placeholder="Pesquisar..."
      />
    );
  }

  const handleModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={id === 0 ? handleCreate : handleUpdate}>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do produto"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formUnidade">
              <Form.Label>Unidade</Form.Label>
              <select className="form-control" value={unidade} onChange={(e) => setUnidade(e.target.value)}>
                <option value="">Selecione</option>
                <option value="KG">KG</option>
                <option value="UN">UN</option>
                <option value="LT">LT</option>
              </select>
            </Form.Group>
            <Form.Group controlId="formValor">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite o valor do produto"
                value={valor}
                onChange={(e) => setValor(Number(e.target.value))}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }


  const handleTable = () => {
    return (
      <div>
        <div className="row">
          <div className="col-6">
            {handleFilter()}
          </div>
          <div className="col-6 text-right">
            {handleClearButton()}
          </div>
        </div>
        <br />
        <table className="table table-striped" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <i className="fas fa-sort-down"></i>
                        ) : (
                          <i className="fas fa-sort-up"></i>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      {handleModal()}
      {handleTable()}
    </div>
  );
}


function Produtos() : React.ReactElement 
{
  // para criar o produto
  const [nome, setNome] = useState("");
  const [unidade, setUnidade] = useState("");
  const [valor, setValor] = useState(0);

  const handleCreate = (e: any) => {
    e.preventDefault();
    const data = {
      nome,
      unidade,
      valor,
    };
    api.post("/produtos", data)
    .then(() => {
      toast.success("Produto cadastrado com sucesso!");
      setNome("");
      setUnidade("");
      setValor(0);
    })
    .catch(() => {
      toast.error("Erro ao cadastrar o produto!");
    });

  }

  const handleForm = () => {
    return (
      <Form onSubmit={handleCreate} className="p-4">
        <Form.Group controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formUnidade">
          <Form.Label>Unidade</Form.Label>
          <select className="form-control" value={unidade} onChange={(e) => setUnidade(e.target.value)}>
            <option value="">Selecione</option>
            <option value="KG">KG</option>
            <option value="UN">UN</option>
            <option value="LT">LT</option>
          </select>
            
        </Form.Group>
        <Form.Group controlId="formValor">
          <Form.Label>Valor</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite o valor do produto"
            value={valor}
            step="0.01"
            onChange={(e) => setValor(Number(e.target.value))}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Salvar
        </Button>
      </Form>
    );
  }



  return (
    <div className="container p-4">
      <hr />
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title">Lista de Produtos</h5>
            </div>
            <div className="pt-5 pb-4 pr-3">
              {handleForm()}
            </div>

            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <Table />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Produtos;