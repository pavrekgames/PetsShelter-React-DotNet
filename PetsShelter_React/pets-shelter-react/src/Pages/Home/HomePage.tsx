import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pet } from "../../Models/Pet";
import PetToAdopt from "../../Components/PetToAdopt/PetToAdopt";
import api from "../../Api/api";
import Spinner from "../../Components/Spinner/Spinner";

const HomePage = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Array<Pet>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get("newest-pets").then((res) => {
      setPets(res.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      
    });
  }, []);

  return (
    <>
      <div className="app-background text-center text-light p-5">
        <h2> Zaadoptuj zwierzaka lub pomóż w inny sposób!</h2>
      </div>

      <div className="app-background d-flex justify-content-center">
        <div className="p-2">
          <button
            type="button"
            className="btn text-light btn-rounded"
            style={{ backgroundColor: "#6a994e" }}
            onClick={() => navigate("/pets-to-adopt")}
          >
            Zwierzęta do adopcji
          </button>
        </div>

        <div className="p-2">
          <button
            onClick={() => navigate("/sick-pets")}
            type="button"
            className="btn text-light btn-rounded"
            style={{ backgroundColor: "#6a994e" }}
          >
            Chore zwierzęta
          </button>
        </div>
      </div>

      <div className="app-background text-start text-light px-7 pb-1">
        <h5 className="p-5">
          <b>Najnowsze:</b>
        </h5>
      </div>

      {isLoading ? (
        <div className="app-background p-1">
          <Spinner isLoading={isLoading} />
        </div>
      ) : (
        pets.map((pet) => <PetToAdopt key={pet.id} pet={pet} />)
      )}
    </>
  );
};

export default HomePage;
