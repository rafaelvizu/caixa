import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

function Produtos(): JSX.Element
{
     const [produtos] = useState([{
          nome: 'fsfs',
          unidade: 'fsf',
          valor: 0,
          ativo: false
     }]);
     
     const [produtosPesquisa, setProdutosPesquisa] = useState([]);
     const [pesquisa, setPesquisa] = useState('');

     useEffect(() => {
          setProdutosPesquisa(produtos);
     }, [produtos]);

     useEffect(() => {
          setProdutosPesquisa(produtos.filter(produto => produto.nome.toLowerCase().includes(pesquisa.toLowerCase())));
     }, [pesquisa, produtos]);

     
     return (
          <div className="container-fluid">
          <h3 className="text-dark mb-4">Produtos</h3>
          <div className="card shadow">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
               <p className="text-primary m-0 fw-bold">Veja os produtos</p>

               <button className="btn btn-primary">
                    Novo Produto
               </button>
          </div>
          <div className="card-body">
               <div className="row">
               <div className="col-md-6">
                    <div className="text-md-end dataTables_filter" id="dataTable_filter">
                         <label className="form-label">
                              <input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
                         </label>
                    </div>
               </div>
               </div>
               <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
               <table className="table my-0" id="dataTable">
                    <thead>
                    <tr>
                    <th>Nome</th>
                    <th>Unidade</th>
                    <th>Valor</th>
                    <th>Ativo</th>
                    <th>Editar</th>
                    </tr>
                    </thead>
                    <tbody>
                         {produtosPesquisa.map((produto, index) => (
                              <tr key={index}>
                                   <td>{produto.nome}</td>
                                   <td>{produto.unidade}</td>
                                   <td>{produto.valor}</td>
                                   <td>{produto.ativo ? 'Sim' : 'Não'}</td>
                                   <td><FaEdit /></td>
                              </tr>
                         ))}
                    </tbody>
               </table>
               </div>
          </div>
          </div>
          </div>

     )
}


export default Produtos;