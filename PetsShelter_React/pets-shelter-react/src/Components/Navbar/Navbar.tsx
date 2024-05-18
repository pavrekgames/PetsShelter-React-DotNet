import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { faShieldDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../App/hooks";
import { useAppDispatch } from "../../App/hooks";
import { logOut } from "../../Features/isLoggedInSlice";
import * as alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api";
import { removeToken } from "../../Features/tokenSlice";
import { removeUser, setUser } from "../../Features/userSlice";
import { setMessagesCount } from "../../Features/messagesCountSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const messagesCount = useAppSelector((state) => state.messagesCount.value);

  const isLoggedIn = useAppSelector((state) => state.isLoggedIn.value);
  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };
  const loggedUser = useAppSelector((state) => state.user);

  const dogIcon = <FontAwesomeIcon icon={faShieldDog} />;
  const dollarIcon = <FontAwesomeIcon icon={faSackDollar} />;
  const envelopeIcon = <FontAwesomeIcon icon={faEnvelope} />;
  const plusIcon = <FontAwesomeIcon icon={faPlus} />;
  const userIcon = <FontAwesomeIcon icon={faUser} />;

  const visibleMessageClass =
    "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger visible";
  const invisibleMessageClass =
    "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger invisible";

  useEffect(() => {
    if (isLoggedIn) {
      checkTokenExpired();
    }
  });

  const checkAuthorizedUser = () => {
    api
      .post("me", null, { headers })
      .then((res) => {
        dispatch(setUser(res.data));
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkTokenExpired = () => {
    if (token !== "empty") {
      const expiry = JSON.parse(atob(token.split(".")[1]));

      if (expiry.exp < Date.now() / 1000) {
        logout();
      } else {
        checkAuthorizedUser();
        getMessagesCount();
      }
    }
  };

  const getMessagesCount = () => {
    api.get("messages-count", { headers }).then((res) => {
      dispatch(setMessagesCount(res.data));
    });
  };

  const logout = () => {
    dispatch(removeToken());
    dispatch(logOut());
    dispatch(removeUser());
    alertify.success("Zostałeś wylogowany");
    navigate("/");
  };

  const loggedTemplate = (
    <>
      <div className="fa-xl pe-3 pt-2 text-dark">
        {dollarIcon} <b>{loggedUser.tokens_count}</b>
      </div>

      <div className="fa-1x pe-3">
        <button
          type="button"
          className="btn btn-primary position-relative"
          onClick={() => navigate("/messages")}
        >
          {envelopeIcon}

          <span
            className={
              messagesCount > 0 ? visibleMessageClass : invisibleMessageClass
            }
          >
            {messagesCount}
          </span>
        </button>
      </div>

      <div className="fa-1x pe-1">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/add-pet")}
        >
          Dodaj {plusIcon}
        </button>
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn btn-success dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {loggedUser.name} {userIcon}
        </button>
        <ul className="dropdown-menu">
          <li>
            <Link className="dropdown-item" to="edit-profile">
              Edytuj profil
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="my-pets">
              Moje zwierzęta
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="saved-pets">
              Zapisane
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/bundles">
              Doładuj żetony
            </Link>
          </li>

          {loggedUser.role === "admin" && (
            <div>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="/users">
                  Użytkownicy
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/sick-pets-manager">
                  Chore zwierzęta
                </Link>
              </li>
            </div>
          )}

          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" to="/" onClick={logout}>
              Wyloguj
            </Link>
          </li>
        </ul>
      </div>
    </>
  );

  const unloggedTemplate = (
    <>
      <Link className="nav-link text-light" to="/register">
        Rejestracja
      </Link>
      <Link className="nav-link text-light" to="/login">
        Zaloguj
      </Link>
    </>
  );

  return (
    <>
      <div className="app-background px-6 pb-1">
        <div className="theme-bgr ps-5 pe-5 ">
          <nav className="navbar navbar-expand-lg mb-1 m-3 ">
            <div className="container-fluid">
              <div className="fa-3x ms-1">{dogIcon}</div>

              <Link className="navbar-collapse navbar-brand text-light" to="/">
                <span className="ps-2"></span> Pets Shelter{" "}
              </Link>

              <div className="">
                <div className="navbar-nav ms-auto">
                  <div className="fa-xl pe-3 pt-2 text-dark"></div>
                  {isLoggedIn ? loggedTemplate : unloggedTemplate}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
