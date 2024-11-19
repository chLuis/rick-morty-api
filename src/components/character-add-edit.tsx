import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/modal";
import { CharacterType } from "../types/data";
import { Button, Input } from "@nextui-org/react";
import { useCharactersStore } from "../services/stores/personajes.store";
import { toast } from "sonner"


export default function CharacterAddEdit({option, character}:{option: string, character?: CharacterType}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const editPersonaje = useCharactersStore((state) => state.editPersonajes)
  const addPersonaje = useCharactersStore((state) => state.addOnePersonaje)
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = e.currentTarget;
    const data: CharacterType = {
      id: character?.id || -1,
      name: (formData.elements.namedItem("name") as HTMLInputElement).value,
      image: (formData.elements.namedItem("image") as HTMLInputElement).value,
      species: (formData.elements.namedItem("species") as HTMLInputElement).value,
      status: (formData.elements.namedItem("status") as HTMLInputElement).value,
      type: (formData.elements.namedItem("type") as HTMLInputElement).value,
      gender: (formData.elements.namedItem("gender") as HTMLInputElement).value,
      origin: {
        name: (formData.elements.namedItem("origin") as HTMLInputElement).value,
        url: character?.origin?.url || "",
      },
      location: {
        name: (formData.elements.namedItem("location") as HTMLInputElement).value,
        url: character?.location?.url || "", 
      },
      episode: character?.episode || ["", ""], 
      url: character?.url || "", 
      created: character?.created || new Date().toISOString(),
    };

    if(option === "Editar"){
      editPersonaje(data as CharacterType);
      toast("Personaje editado")
    }else{
      addPersonaje(data as CharacterType);
      toast("Personaje creado")
    }
      onOpenChange()
  }
  return (
    <>
      <Button onPress={onOpen} color="primary" variant="solid">{option}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{option}</ModalHeader>
                <form onSubmit={(e) => handleSubmit(e)}>
              <ModalBody>
                  <div className="flex flex-col gap-4">
                    <Input type="text" required maxLength={36} name="name" label="Nombre" autoFocus defaultValue={character?.name || ""} />
                    <Input type="text" required maxLength={120} name="image" label="Imagen" defaultValue={character?.image || ""} />
                    <Input type="text" required maxLength={36} name="species" label="Especie" defaultValue={character?.species || ""} />
                    <Input type="text" required maxLength={36} name="status" label="Estado" defaultValue={character?.status || ""} />
                    <Input type="text" required maxLength={36} name="type" label="Tipo" defaultValue={character?.type || ""} />
                    <Input type="text" required maxLength={36} name="gender" label="Genero" defaultValue={character?.gender || ""} />
                    <Input type="text" required maxLength={36} name="origin" label="Origen" defaultValue={character?.origin.name || ""} />
                    <Input type="text" required maxLength={36} name="location" label="Ubicacion" defaultValue={character?.location?.name || ""} />
                  </div>
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  {option}
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}