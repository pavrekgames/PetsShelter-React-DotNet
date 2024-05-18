import React, { useEffect, useState } from "react";
import "./PetsToAdoptPage.css";
import { useNavigate } from "react-router-dom";
import { Pet } from "../../Models/Pet";
import PetToAdopt from "../../Components/PetToAdopt/PetToAdopt";
import api from "../../Api/api";
import ReactPaginate from "react-paginate";

type Props = {};

const PetsToAdoptPage = (props: Props) => {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Array<Pet>>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const itemsPerPage = 4;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(pets.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const searchItems = (item) => {
    if (search === "") {
      return item;
    } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
      return item;
    } else if (item.species.toLowerCase().includes(search.toLowerCase())) {
      return item;
    } else if (item.size.toLowerCase().includes(search.toLowerCase())) {
      return item;
    }
  };

  useEffect(() => {
    api.get("pets-to-adopt").then((res) => setPets(res.data));
  }, []);

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />

      <div className="app-background text-center text-light p-5">
        <h2> Przeglądaj zwierzęta do adopcji</h2>
      </div>

      <div className="app-background px-6 d-flex justify-content-center pb-3">
        <div className="p-2">
          <button
            type="button"
            className="btn text-light btn-rounded"
            style={{ backgroundColor: "#6a994e" }}
            disabled={true}
          >
            Zwierzęta do adopcji
          </button>
        </div>

        <div className="p-2">
          <button
            type="button"
            className="btn text-light btn-rounded"
            style={{ backgroundColor: "#6a994e" }}
            onClick={() => navigate("/sick-pets")}
          >
            Chore zwierzęta
          </button>
        </div>
      </div>

      <div className="mx-auto row app-background justify-content-center px-6 p-5">
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-4">
          <input
            className="form-control"
            type="text"
            name="search"
            autoComplete="off"
            placeholder="&#xF002; Szukaj po gatunku, rasie czy rozmiarze"
            style={{ fontFamily: "Arial, FontAwesome" }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {pets
        .filter(searchItems)
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((pet) => (
          <PetToAdopt key={pet.id} pet={pet} />
        ))}

      <div className="app-background d-flex justify-content-center p-3">
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
    </>
  );
};

export default PetsToAdoptPage;
