import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/home"
import CharactersPage from "./pages/characters"
import { Toaster } from "sonner"

function App() {

  return (
  <div className="Aplicacion">
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="characters" element={ <CharactersPage /> } />
        {/* <Route path="characters" element={ <CharactersPage /> } />
        <Route path="characters" element={ <CharactersPage /> } /> */}
        {/* <Route path="contacto" element={ <Contacto /> } /> */}
      </Routes>
      <Toaster />
    </div>
  )
}

export default App