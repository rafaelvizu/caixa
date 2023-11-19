import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "../components/Header";
import Produtos from "../pages/dashboard/produtos";
import Vendas from "../pages/dashboard/vendas";
import CadastroVenda from "../pages/dashboard/cadastroVenda";
import Home from "../pages/dashboard/home";

function Router()
{
     return (
       <BrowserRouter>
         <Header />
         <Routes>
           <Route path="/" element={<Home />} />

           <Route path="/produtos" element={<Produtos />} />
           <Route path="/vendas" element={<Vendas />} />
           <Route path="/vendas-cadastro" element={<CadastroVenda />} />
         </Routes>
       </BrowserRouter>
     );
}


export default Router;
