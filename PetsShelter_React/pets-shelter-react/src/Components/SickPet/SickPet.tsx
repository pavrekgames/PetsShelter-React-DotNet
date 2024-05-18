import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { SickPet as SickPetModel } from "../../Models/SickPet";

type Props = {};

const SickPet = ({ pet }: { pet: SickPetModel }) => {
  const dollarIcon = <FontAwesomeIcon icon={faSackDollar} />;

  return (
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
              {pet.disease}
            </span>
          </div>
          <div className="col-auto p-1">
            <span
              className={
                pet.status === "Aktywne"
                  ? "p-3 badge bg-danger rounded-pill"
                  : "p-3 badge bg-success rounded-pill"
              }
            >
              {pet.status}
            </span>
          </div>
        </div>

        <div className="p-4 d-flex flex-row justify-content-center">
          <div className="d-inline">
            <h4 className="text-light">
              {pet.current_tokens} / {pet.required_tokens} {dollarIcon}
            </h4>
          </div>
        </div>

        <div className="d-flex flex-row pb-2 justify-content-center">
          <div className="d-inline">
            <label htmlFor="tokens_count" className="form-label m-2">
              {" "}
              <b>Wspomóż:</b>
            </label>
          </div>
          <div className="d-inline">
            <input
              type="number"
              className="form-control"
              id="tokens_count"
              name="tokens_count"
              min="1"
              max="1000"
              maxLength={4}
            />
          </div>
          <div className="d-inline ps-1">
            <button type="button" className="btn btn-warning btn-rounded">
              {" "}
              Wyślij{" "}
            </button>
          </div>
        </div>

        <div className="text-center">
          <span className="text-dark bg-danger">
            <b>Minimalna ilość żetonów musi wynosić 1</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SickPet;
