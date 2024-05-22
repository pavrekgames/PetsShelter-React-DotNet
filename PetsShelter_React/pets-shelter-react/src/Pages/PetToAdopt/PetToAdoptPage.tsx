import React, { useEffect, useState } from "react";
import { Pet } from "../../Models/Pet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/api";
import { useAppSelector } from "../../App/hooks";
import * as alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

type Props = {};

const PetToAdoptPage = (props: Props) => {
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet>(null);
  const [saveButtonText, setSaveButonText] = useState<string>("Zapisz");
  const { id } = useParams();
  const userId = useAppSelector((state) => state.user.id);
  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };
  const [isPet, setIsPet] = useState<boolean>(false);
  const [isPetSaved, setIsPetSaved] = useState<boolean>(false);
  const [isLoggedUserPet, setIsLoggedUserPet] = useState<boolean>(false);

  const heartIcon = <FontAwesomeIcon icon={faHeart} />;
  const EnvelopeIcon = <FontAwesomeIcon icon={faEnvelope} />;

  useEffect(() => {
    api
      .get(`pets-to-adopt/${id}`, { headers })
      .then((res) => setPet(res.data))
      .then(() => setIsPet(true));
    api
      .get(`check-saved-pet/${id}`, { headers })
      .then((res) => handleSavedPet(res.data));

    if (isPet) {
      checkLoggedUserPet();
    }
  }, [isPet, isPetSaved, isLoggedUserPet]);

  const handleSavedPet = (data: any) => {
    if (id == data.pet_id) {
      setIsPetSaved(true);
      setSaveButonText("Zapisane");
    } else {
      setIsPetSaved(false);
      setSaveButonText("Zapisz");
    }
  };

  const checkLoggedUserPet = () => {
    if (userId == pet.user_id) {
      setIsLoggedUserPet(true);
    } else {
      setIsLoggedUserPet(false);
    }
  };

  const savePet = () => {
    api
      .post(`add-saved-pet/${id}`, null, { headers })
      .then(handleSavePetSuccess)
      .catch((error) => {
        alertify.error("Wystąpił problem!");
      });
  };

  const handleSavePetSuccess = () => {
    setIsPetSaved(true);
    setSaveButonText("Zapisano");
    alertify.success("Zapisano zwierzę");
  };

  const createConversation = () => {
    api
      .post("create-conversation", pet, { headers })
      .then((res) => handleConversationSuccees(res.data))
      .catch((error) => {
        alertify.error("Wystąpił problem!");
      });
  };

  const handleConversationSuccees = (data) => {
    const conversationId = data.id
    navigate(`/messages/${conversationId}`);
  };

  return (
    <>
      <div className="app-background text-center text-light p-5">
        <h2> Zwierzę do adopcji</h2>
      </div>

      <div className="mx-auto row px-7 app-background text-light justify-content-center pb-2">
        <div className="col-auto p-2">
          <div className="justify-content-center">
            <img src={pet?.photo_Path} alt="Pet" className="img-size-pet" />
          </div>

          <div className="text-center text-warning p-2">
            <h3>
              <b>{pet?.name}</b>
            </h3>
          </div>
        </div>

        <div className="col-6 ms-3">
          <div className="mx-auto row justify-content-center pe-5">
            <div className="col-auto p-1">
              <span className="p-3 badge bg-primary rounded-pill">
                {pet?.species}
              </span>
            </div>
            <div className="col-auto p-1">
              <span className=" p-3 badge bg-primary rounded-pill">
                {pet?.race}
              </span>
            </div>
            <div className="col-auto p-1">
              <span className=" p-3 badge bg-primary rounded-pill">
                {pet?.size}
              </span>
            </div>
          </div>

          <div className="mx-auto row p-4 justify-content-center">
            {pet?.description}
          </div>
        </div>
      </div>

      <div className="mx-auto d-flex flex-row px-8 app-background text-light justify-content-start pb-2 ">
        {!isLoggedUserPet && (
          <div className="d-flex flex-grow-1 justify-content-center">
            <div className="col-3 ps-5 text-center">
              <button
                type="button"
                className="btn btn-success btn-rounded"
                disabled={isPetSaved}
                onClick={savePet}
              >
                {saveButtonText} {heartIcon}
              </button>
            </div>

            <div className="col-3 ps-4 text-center">
              <button
                type="button"
                className="btn btn-primary btn-rounded"
                onClick={createConversation}
              >
                Wiadomość {EnvelopeIcon}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="app-background text-center text-light px-8 pt-4">
        <div className="pt-4 border-top">
          <button
            type="button"
            className="btn text-light btn-rounded"
            style={{ backgroundColor: "#6a994e" }}
            onClick={() => navigate("/pets-to-adopt")}
          >
            Zwierzęta do adopcji
          </button>
        </div>
      </div>
    </>
  );
};

export default PetToAdoptPage;
