import React, { useEffect, useState } from "react";
import "./SickPetsManagerPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SickPet } from "../../Models/SickPet";
import { useAppSelector } from "../../App/hooks";
import api from "../../Api/api";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

type Props = {};

const SickPetsManagerPage = (props: Props) => {
  const navigate = useNavigate();

  const [pets, setPets] = useState<Array<SickPet>>([]);
  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };

  const [pageNumber, setPageNumber] = useState<number>(0);

  const itemsPerPage = 4;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(pets.length / itemsPerPage);

  const plusIcon = <FontAwesomeIcon icon={faPlus} />;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    api.get("sick-pets", { headers }).then((res) => setPets(res.data));
  }, []);

  return (
    <>
      <div className="app-background text-center text-light p-5">
        <h2> Chore zwierzęta - Menadżer</h2>
      </div>

      <div className="app-background px-6 d-flex justify-content-center pb-3">
        <div className="p-1">
          <button
            type="button"
            className="btn btn-primary btn-rounded"
            onClick={() => navigate("/sick-pets-manager/add")}
          >
            Dodaj {plusIcon}
          </button>
        </div>
      </div>

      <div>
        {pets.length > 0 && (
          <div className="px-6 app-background table-responsive">
            <table className="table table-striped table-dark table-sm table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Zdjęcie</th>
                  <th scope="col">Imię</th>
                  <th scope="col">Gatunek</th>
                  <th scope="col">Choroba</th>
                  <th scope="col">Obecna liczba żetonów</th>
                  <th scope="col">Wymagana liczba żetonów</th>
                  <th scope="col">Status</th>
                  <th scope="col">Akcja</th>
                </tr>
              </thead>
              <tbody>
                {pets
                  .slice(pagesVisited, pagesVisited + itemsPerPage)
                  .map((pet, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img
                          src={pet.photoPath}
                          alt="Pet"
                          className="img-size-my-pet"
                        />
                        <div className="pt-2 ">
                          <button
                            type="button"
                            className="btn btn-info p-2"
                            onClick={() =>
                              navigate(
                                "/sick-pets-manager/edit-photo/" + pet.id
                              )
                            }
                          >
                            Zmień
                          </button>
                        </div>
                      </td>
                      <td>{pet.name}</td>
                      <td>{pet.species}</td>
                      <td>{pet.disease}</td>
                      <td>{pet.currentTokens}</td>
                      <td>{pet.requiredTokens}</td>
                      <td>{pet.status}</td>
                      <td>
                        <div className="text-center pt-2">
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() =>
                              navigate("/sick-pets-manager/edit/" + pet.id)
                            }
                          >
                            Edytuj
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
        )}

        <div className="app-background d-flex justify-content-center items-center p-3">
          <ReactPaginate
            previousLabel="&laquo;"
            nextLabel="&raquo;"
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="paginator"
            previousLinkClassName="paginator-previous"
            nextLinkClassName="paginator-next"
            disabledClassName="paginator-disabled"
            activeClassName="paginator-active"
          />
        </div>
      </div>
    </>
  );
};

export default SickPetsManagerPage;
