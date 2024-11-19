import { Pagination } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CharacterPagination({ page, quantity }:{ page: number, quantity: number }) {
  const cantidad = Math.ceil(quantity/20)
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  async function handleChange(e: number){
    params.set('page', e.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  }
  
  return (
    <div className="col-span-12 mx-auto">
      <Pagination total={cantidad} initialPage={cantidad} page={page || 1} onChange={(e) => handleChange(e)}/>
    </div>
  )
}