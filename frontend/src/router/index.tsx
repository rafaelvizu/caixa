import { Routes, Route, BrowserRouter } from "react-router-dom";

import Produtos from "../pages/dashboard/produtos";
import Header from "../components/Header";
import Navbar from "../components/Navbar";


function Router()
{
     return (
       <BrowserRouter>
         <div id="wrapper">
           <Header />
           <div className="d-flex flex-column" id="content-wrapper">
             <div id="content">
               <Navbar />
               <Routes>
                 <Route path="/produtos" element={<Produtos />} />
               </Routes>
             </div>
           </div>
         </div>
       </BrowserRouter>
     );
}


export default Router;
