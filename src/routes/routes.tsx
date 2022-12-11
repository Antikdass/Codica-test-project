import { Navigate, Route, Routes } from "react-router-dom";
import DetailInfo from "../pages/detailInfo/detailInfo";
import Home from "../pages/home/home";

export const Router = () => (
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/detail-info/:city" element={<DetailInfo />} />
   </Routes>
);
