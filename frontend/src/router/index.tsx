import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "../components/Header";
import Produtos from "../pages/dashboard/produtos";
import Vendas from "../pages/dashboard/vendas";


function Router()
{
     return (
       <BrowserRouter>
         <Header />
         <Routes>
           <Route path="/produtos" element={<Produtos />} />
           <Route path="/vendas" element={<Vendas/>} />
         </Routes>
       </BrowserRouter>
     );
}


export default Router;
