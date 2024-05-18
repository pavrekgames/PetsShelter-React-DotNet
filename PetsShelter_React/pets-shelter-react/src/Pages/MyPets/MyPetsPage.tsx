import React, { useEffect, useState } from "react";
import { Pet } from "../../Models/Pet";
import api from "../../Api/api";
import { useAppSelector } from "../../App/hooks";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ConfirmModal from "../../Components/Modals/ConfirmModal";
import * as alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
type Props = {};

const MyPetsPage = (props: Props) => {
  const navigate = useNavigate();

  const [pets, setPets] = useState<Array<Pet>>([]);
  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };

  const confirmTitle = "Usuwanie zwierzęcia";
  const [confirmMessage, setConfirmMessge] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [petId, setPetId] = useState<number>(0);
  const [isPetDeleted, setIsPetDeleted] = useState<boolean>(false);

  const deleteWindow = (pet: Pet) => {
    setOpenModal(true);
    setPetId(pet.id);
    setConfirmMessge(
      "Czy na pewno chcesz usunąć zwierzę o imieniu " + pet.name + " ?"
    );
  };

  const deletePet = () => {
    api
      .post(`my-pets/delete/${petId}`, { headers })
      .then((res) => {
        setOpenModal(false);
        setIsPetDeleted(true);
        alertify.success("Usunąłeś zwierzę");
      })
      .catch(handleDeletePetError);
  };

  const handleDeletePetError = () => {
    if(petId !== 0){
      alertify.error("Wystąpił problem!")
    }
  }

  useEffect(() => {
    setIsPetDeleted(false);
    api.get("my-pets", { headers }).then((res) => setPets(res.data));
  }, [isPetDeleted]);

  return (
    <>
      {openModal && (
        <ConfirmModal
          title={confirmTitle}
          message={confirmMessage}
          confirmModal={deletePet}
          closeModal={setOpenModal}
        />
      )}

      <div className="app-background text-center text-light p-5">
        <h2> Twoje zwierzęta</h2>
      </div>

      <div>
        <div className="px-6 app-background table-responsive">
          <table className="table table-striped table-dark table-sm table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Zdjęcie</th>
                <th scope="col">Imię</th>
                <th scope="col">Gatunek</th>
                <th scope="col">Rasa</th>
                <th scope="col">Rozmiar</th>
                <th scope="col">Akcja</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      src={pet.photo_path}
                      alt="Pet"
                      className="img-size-my-pet"
                    />
                    <div className="pt-2">
                      <button
                        type="button"
                        className="btn btn-info p-2"
                        onClick={() =>
                          navigate("/my-pets/edit-photo/" + pet.id)
                        }
                      >
                        Zmień
                      </button>
                    </div>
                  </td>
                  <td>{pet.name}</td>
                  <td>{pet.species}</td>
                  <td>{pet.race}</td>
                  <td>{pet.size}</td>
                  <td>
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => navigate("/pets-to-adopt/" + pet.id)}
                      >
                        Zobacz
                      </button>
                    </div>
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() => navigate("/my-pets/edit/" + pet.id)}
                      >
                        Edytuj
                      </button>
                    </div>
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteWindow(pet)}
                      >
                        Usuń
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyPetsPage;
