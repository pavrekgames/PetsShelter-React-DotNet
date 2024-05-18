import React, { useEffect, useState } from "react";
import { Pet } from "../../Models/Pet";
import { useAppSelector } from "../../App/hooks";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

type Props = {};

const SavedPetsPage = (props: Props) => {
  const navigate = useNavigate();

  const [pets, setPets] = useState<Array<Pet>>([]);
  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };

  useEffect(() => {
    api.get("saved-pets", { headers }).then((res) => setPets(res.data));
  }, []);

  return (
    <>
      <div className="app-background text-center text-light p-5">
        <h2> Zapisane zwierzęta</h2>
      </div>

      <div>
        <div className="px-6 app-background">
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
                    <div className="ps-2 d-inline"> </div>
                  </td>
                  <td>{pet.name}</td>
                  <td>{pet.species}</td>
                  <td>{pet.race}</td>
                  <td>{pet.size}</td>
                  <td>
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => navigate("/pets-to-adopt/" + pet.id)}
                      >
                        Zobacz
                      </button>
                    </div>
                    <div className="text-center pt-2">
                      <button type="button" className="btn btn-danger">
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

export default SavedPetsPage;
