import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import ViewPage from "../pages/ViewPage/ViewPage";

function AppRoutes() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/view/:id" element={<ViewPage/>}></Route>
    </Routes>
    
    </BrowserRouter>
  );
}
export default AppRoutes;