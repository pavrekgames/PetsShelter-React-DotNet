import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { SickPet as SickPetModel } from "../../Models/SickPet";
import { useAppSelector } from "../../App/hooks";
import api from "../../Api/api";
import * as alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

type Props = {};

const SickPet = ({ pet }: { pet: SickPetModel }) => {
  const dollarIcon = <FontAwesomeIcon icon={faSackDollar} />;

  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };

  const [isTokensSent, setIsTokensSent] = useState<boolean>(false);
  let tokensCount = 0;
  const id = pet.id;

  useEffect(() => {
    setIsTokensSent(false);
  }, [isTokensSent]);

  const setTokensCount = (e) => {
    tokensCount = e.target.value;
  }

  const transferTokens = () => {

    api
    .post(`transfer-tokens/${id}`, {tokens_Count: tokensCount}, { headers })
    .then((res) => {
      alertify.success("Przesłano żetony");
      setIsTokensSent(true);
      console.log(res.data);
    })
    .catch((error) => {
      alertify.error("Wystąpił problem");
      console.log(error);
    });

  }

  return (
    <div className="mx-auto row px-7 app-background text-light justify-content-center pb-2 ">
      <div className="col-3 theme-bgr p-2 border-start border-top border-bottom border-warning border-3">
        <img src={pet.photoPath} alt="Pet" className="img-size" />
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
              {pet.currentTokens} / {pet.requiredTokens} {dollarIcon}
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
              onChange={(e) => setTokensCount(e)}
            />
          </div>
          <div className="d-inline ps-1">
            <button type="button" className="btn btn-warning btn-rounded" onClick={transferTokens}>
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
