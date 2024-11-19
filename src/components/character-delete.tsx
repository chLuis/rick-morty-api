import { Button } from "@nextui-org/react";
import { useCharactersStore } from "../services/stores/personajes.store";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { CharacterType } from "../types/data";
import { toast } from "sonner"


export default function CharacterDelete({ option, character }: { option:string, character?: CharacterType }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const deleteCharacter = useCharactersStore((state) => state.removePersonaje);
  const deleteAllCharacter = useCharactersStore((state) => state.removeAllPersonajes);
  const handleDelete = () => {
    if(option === "Eliminar") {
      deleteCharacter(character?.id!);
      toast("Personaje eliminado")
    } else {
      deleteAllCharacter()
      toast("Se vació la base de datos")
    }
    onOpenChange();

  };
  return (
    <>
      <Button onPress={onOpen} color="danger" variant="light">
        {option}
      </Button>
      <Modal isOpen={isOpen} placement="top-center" size="xs" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Eliminar {character?.name}
              </ModalHeader>

              <ModalBody>
                {option === "Eliminar" 
                ? <span>¿Desea eliminar a <strong>{character?.name}</strong> de la base de datos?</span>
                : <span>¿Desea eliminar <strong>todos los personajes</strong> de la base de datos?</span>}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="danger" onClick={handleDelete}>
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
