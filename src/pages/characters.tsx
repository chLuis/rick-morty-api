import axios from "axios";
import { useLocation } from "react-router-dom";
import { CharacterType, DataType } from "../types/data";
import { useCharactersStore } from "../services/stores/personajes.store";
import { useMemo, useState,  } from "react";
import Card from "../components/card";
import Navigation from "../components/navigation";
import CharacterAddEdit from "../components/character-add-edit";
import CharacterDelete from "../components/character-delete";
import CharacterPagination from "../components/character-pagination";
import GoToTopButton from "../components/go-to-top-button";
import { Input } from "@nextui-org/react";

export default function CharactersPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const personajes = useCharactersStore((state) => state.getPersonajes())
  const setPersonajes = useCharactersStore((state) => state.addPersonajes)
  const [page, setPage] = useState(Number(params.get('page')) || 1)
  const [loading, setLoading] = useState(false)
  const [personajesFiltrados, setPersonajesFiltrados] = useState<CharacterType[]>(personajes)

  useMemo(async () => {;
    setLoading(true)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setPage(Number(params.get('page')) || 1)
    if((!page || page === 1) && personajes.length === 0) await FetchPersonajes("https://rickandmortyapi.com/api/character/")
    setLoading(false)
  }, [location])
  
  useMemo(() => {
    if(!personajes) return
    const filter = document?.getElementById('search-word') as HTMLInputElement
    const filterValue = filter?.value
    if(!filterValue) return setPersonajesFiltrados(personajes)
    handleSearch(filterValue)
  }, [personajes])

  async function FetchPersonajes(url : string) {
    const { data } = await axios.get(url);
    const pages = data?.info.pages
    for (let i = 2; i <= pages; i++) {
      const { data: pageData } = await axios.get(`https://rickandmortyapi.com/api/character/?page=${i}`);
      data.results.push(...pageData.results);
    }
    SetDataInStore(data)
    return;
  }

  function SetDataInStore(data: DataType) {
    setPersonajes(data?.results!);
    setPersonajesFiltrados(data?.results!);
  }
  
  if(loading) return (
  <div className="grid grid-cols-12 text-white">
    <Navigation path="Personajes" />
    <div className="col-span-12 flex flex-col items-center pt-24 min-h-screen bg-indigo-950">
    <div className="w-24 h-24 mt-16 border-2 border-indigo-600 border-t-indigo-900 rounded-full animate-spin">
      </div>
      <div className="flex flex-col items-center justify-center px-4 max-w-7xl mx-auto animate-pulse">

    <div className="">Obteniendo informacion</div>
    <div>La primera vez puede tomar unos segundos...</div>
      </div>
    </div>
    </div>)

  function handleSearch(value: string) {
    //setSearchCharacter(value)
    const dataFiltrada = personajes.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
    return setPersonajesFiltrados(dataFiltrada)
  }

  return (
    <div className="grid grid-cols-12 gap-2">
      <Navigation path="Personajes" />
      <div className="flex gap-2 w-full px-4 max-w-7xl col-span-12 items-end justify-end mx-auto">
        <CharacterAddEdit option="Agregar personaje"/>
        <CharacterDelete option="Eliminar base de datos" />
      </div>
      <div className="col-span-12 flex justify-center items-center">
        <label className="flex gap-2 items-center justify-center">
          <span>Buscar por nombre</span>
          <Input type="text" id="search-word" placeholder="Rick..." onChange={(e) => handleSearch(e.target.value)} className="col-span-12 max-w-44 mx-auto"/>
        </label>
      </div>
      {personajesFiltrados?.length > 1 && <CharacterPagination page={page} quantity={personajesFiltrados.length} />}
      <div className="col-span-12 grid grid-cols-12 px-4 gap-4 max-w-7xl mx-auto">
      {personajesFiltrados?.sort((a, b) => a.id- b.id)?.map((personaje: CharacterType, index: number) => (
        !page 
          ? index < 20 && <Card key={index} personaje={personaje} />
          : (index < Number(page) * 20 && index >= (Number(page) - 1) * 20) && <Card key={index} personaje={personaje} />
      ))}
      </div>
      
      {personajesFiltrados?.length > 1 && <CharacterPagination page={page} quantity={personajesFiltrados.length} />}
      <GoToTopButton />
    </div>
  );
}
