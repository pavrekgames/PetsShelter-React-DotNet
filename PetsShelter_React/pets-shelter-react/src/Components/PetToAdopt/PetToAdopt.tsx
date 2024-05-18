import React from "react";
import { Pet } from "../../Models/Pet";
import { useNavigate } from "react-router-dom";

const PetToAdopt = ({ pet }: { pet: Pet }) => {
  const navigate = useNavigate();
  const petId = pet.id;

  return (
    <>
      <div className="mx-auto row px-7 app-background text-light justify-content-center pb-2 ">
        <div className="col-3 theme-bgr p-2 border-start border-top border-bottom border-warning border-3">
          <img src={pet.photo_path} alt="Pet" className="img-size" />
        </div>

        <div className="col-6 theme-bgr p-2 border border-warning border-3">
          <div className="row justify-content-center">
            <div className="col-auto p-2 pe-4">
              <b>{pet.name}</b>
            </div>
            <div className="col-auto p-1">
              <span className="p-3 badge bg-primary rounded-pill">
                {pet.species}
              </span>
            </div>
            <div className="col-auto p-1">
              <span className=" p-3 badge bg-primary rounded-pill">
                {pet.race}
              </span>
            </div>
            <div className="col-auto p-1">
              <span className=" p-3 badge bg-primary rounded-pill">
                {pet.size}
              </span>
            </div>
          </div>

          <div className="p-4 row justify-content-center">
            <button type="button" className="btn btn-warning btn-rounded" onClick={() => navigate(`/pets-to-adopt/${petId}`)}>
              Zobacz więcej
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetToAdopt;
