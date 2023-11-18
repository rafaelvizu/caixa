import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "../components/Header";
import ProductsPage from "../pages/dashboard";


function Router()
{
     return (
       <BrowserRouter>
           <Header />
               <Routes>
                    <Route path="/produtos" element={<ProductsPage />} />
               </Routes>
     
       </BrowserRouter>
     );
}


export default Router;
