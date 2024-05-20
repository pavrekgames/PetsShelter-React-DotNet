import React, { useState } from "react";
import "./LoginPage.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import * as alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../App/hooks";
import { setToken } from "../../Features/tokenSlice";
import { logIn } from "../../Features/isLoggedInSlice";
import Spinner from "../../Components/Spinner/Spinner";

type Props = {};

type FormFields = {
  email: string;
  password: string;
};

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("E-mail jest wymagany")
      .email("Wpisz poprawny adres e-mail"),
    password: yup.string().required("Hasło jest wymagane"),
  });

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), mode: "all" });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    setIsLoading(true);
    const formData = getValues();

    api
      .post("login", formData)
      .then((res) => {
        console.log(res);
        alertify.success("Zostałeś zalogowany");
        navigate("/");
        dispatch(setToken(res.data.token));
        dispatch(logIn());
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Login error " + error);
        alertify.error("Błąd logowania");
        setError("root", {
          message: "Email lub hasło nieprawidłowe",
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="app-background center ">
      <div className="mx-auto row justify-content-center px-6 pt-5">
        <div className="col-lg-5 rounded ">
          <div className="p-4 text-light text-center">
            <h3>Logowanie</h3>
          </div>

          {isLoading ? (
            <Spinner isLoading={isLoading} />
          ) : (
            <div className="text-light">
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="task-title" className="form-label m-2">
                  E-mail:
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="form-control"
                  placeholder=""
                />

                {errors.email?.message && (
                  <div className="text-danger p-1">{errors.email.message}</div>
                )}

                <label htmlFor="task-title" className="form-label m-2">
                  Hasło:
                </label>
                <input
                  {...register("password")}
                  type="password"
                  className="form-control"
                  placeholder=""
                />

                {errors.password?.message && (
                  <div className="text-danger p-1">
                    {errors.password.message}
                  </div>
                )}

                {errors.root?.message && (
                  <div className="text-danger p-1">{errors.root.message}</div>
                )}

                <div className="text-center m-4">
                  <button type="submit" className="btn btn-warning">
                    Zaloguj
                  </button>
                </div>

                <div className="text-center m-4">
                  <Link to="/reset-password"> Nie pamiętam hasła</Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
