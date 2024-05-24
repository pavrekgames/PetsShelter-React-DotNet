import React, { useEffect, useState } from "react";
import './Users.css'
import { User } from "../../Models/User";
import { useAppSelector } from "../../App/hooks";
import api from "../../Api/api";
import ReactPaginate from "react-paginate";

type Props = {};

const UsersPage = (props: Props) => {
  const [users, setUsers] = useState<Array<User>>([]);
  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };

  const [pageNumber, setPageNumber] = useState<number>(0);

  const itemsPerPage = 4;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    api.get("users", { headers }).then((res) => setUsers(res.data));
  }, []);

  return (
    <>
      <div className="app-background text-center text-light p-5">
        <h2> Zarajestrowani użytkownicy</h2>
      </div>

      <div>
        <div className="px-6 app-background">
          <table className="table table-striped table-dark table-sm table-bordered text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Imię</th>
                <th scope="col">Nazwisko</th>
                <th scope="col">E-mail</th>
                <th scope="col">Ilość żetonów</th>
                <th scope="col">Akcja</th>
              </tr>
            </thead>
            <tbody>
              {users
                .slice(pagesVisited, pagesVisited + itemsPerPage)
                .map((user, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.email}</td>
                    <td>{user.tokens_Count}</td>
                    <td>
                      <div className="text-center d-inline">
                        <button type="button" className="btn btn-danger">
                          Usuń
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

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
      </div>
    </>
  );
};

export default UsersPage;
