import { FaCalendar, FaSkull, FaTransgenderAlt, FaTv } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { CharacterType } from "../types/data";
import CharacterDelete from "./character-delete";
import CharacterAddEdit from "./character-add-edit";
import { useState } from "react";

export default function Card({personaje} : {personaje: CharacterType}) {
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <div
    key={personaje?.id}
    className="col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden"
  >
    <div className="flex flex-col h-full ">
      <div className="relative overflow-clip aspect-square w-full">
      <img
        className={`w-full transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
        src={personaje?.image}
        alt={personaje?.name}
        onLoad={() => setImageLoaded(true)}
        />
      {personaje?.status?.toLowerCase() === "dead" && imageLoaded &&
        <div className="flex flex-nowrap justify-center items-center inset-0 absolute text-3xl bg-black/75 text-white">
        <span className="flex font-bold flex-nowrap justify-center items-center gap-2 -rotate-45 tracking-widest"><FaSkull /> <span>DEAD</span></span>
      </div>}
      <div className={`${imageLoaded ? 'hidden' : 'absolute'} inset-0 m-16 border-2 border-zinc-400 border-t-black rounded-full animate-spin`}>
      </div>
        </div>
      <div className="grow flex flex-col p-5">
        <div className="grow">
          <header className="mb-3">
            <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">
              {personaje.id} - {personaje?.name}
            </h3>
          </header>
          <div className="flex flex-wrap justify-between items-center mb-4 capitalize">
            <p className="flex items-center space-x-2 mr-2 text-sm font-medium text-yellow-600">{personaje?.status}
            </p>
            <p className="inline-flex text-sm font-medium bg-green-500/20 text-green-700 rounded-full text-center px-2 py-0.5">
              {personaje?.species}
            </p>
          </div>

          <ul className="text-sm space-y-2 mb-5 dark:text-gray-300 capitalize">
            <li className="flex items-center">
              <FaTransgenderAlt className="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-3" />
              <div>{personaje?.gender}</div>
            </li>
            <li className="flex items-center">
              <FaTv className="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-3" />

              <div>{personaje?.episode?.length} {personaje?.episode?.length > 1 ? "apariciones":"aparición"}</div>
            </li>
            <li className="flex items-center">
              <FaEarthAmericas className="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-3" />
              <div>{personaje?.origin?.name}</div>
            </li>
            <li className="flex items-center capitalize">
              <FaCalendar className="fill-current text-gray-400 dark:text-gray-500 shrink-0 mr-3" />
              <div>{personaje?.created?.slice(0, 10)}</div>
            </li>
          </ul>
        </div>
        <div className="flex gap-2 justify-end">
          <CharacterAddEdit option="Editar" character={personaje}/>
          <CharacterDelete option="Eliminar" character={personaje}/>
        </div>
      </div>
    </div>
  </div>
  )
}