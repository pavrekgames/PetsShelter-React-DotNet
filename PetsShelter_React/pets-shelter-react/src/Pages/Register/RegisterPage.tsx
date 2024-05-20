import React from "react";
import "./RegisterPage.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import api from "../../Api/api";
import {useNavigate} from "react-router-dom";

type Props = {};

type FormFields = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = (props: Props) => {

  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Imię jest wymagane")
      .max(25, "Podane imię jest za długie"),
    surname: yup
      .string()
      .required("Nazwisko jest wymagane")
      .max(25, "Podane nazwisko jest za długie"),
    email: yup
      .string()
      .required("E-mail jest wymagany")
      .email("Wpisz poprawny adres e-mail"),
    password: yup
      .string()
      .required("Hasło jest wymagane")
      .min(6, "Hasło musi mieć minimalnie 6 znaków"),
    confirmPassword: yup
      .string()
      .required("Pole nie może być puste")
      .oneOf([yup.ref("password"), null], "Hasła nie są takie same"),
  });

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), mode: "all" });

  const createForm = () => {
    const formData = new FormData();
    formData.append("name", getValues("name"));
    formData.append("surname", getValues("surname"));
    formData.append("email", getValues("email"));
    formData.append("userName", getValues("email"));
    formData.append("password", getValues("password"));

    return formData;
  }

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const formData = createForm();
    
    api.post("register", formData).then((res) => {
      console.log(res);
      alertify.success("Zostałeś zarejestrowany");
      navigate("/login");
    })
    .catch((error) => {
      alertify.error("Błąd rejestracji");
      setError("email", {
        message: "Podany e-mail już istnieje! Wprowadź inny adres e-mail",
      });
    })

  };

  return (
    <div className="app-background center ">
      <div className="mx-auto row justify-content-center px-6 pt-5">
        <div className="col-lg-5 rounded">
          <div className="p-4 text-light text-center">
            <h3>Rejestracja</h3>
          </div>

          <div className="text-light">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="task-title" className="form-label m-2">
                Imię:
              </label>
              <input
                {...register("name")}
                type="text"
                className="form-control"
                placeholder=""
              />

              {errors.name?.message && (
                <div className="text-danger p-1">{errors.name.message}</div>
              )}

              <label htmlFor="task-title" className="form-label m-2">
                Nazwisko:
              </label>
              <input
                {...register("surname")}
                type="text"
                className="form-control"
                placeholder=""
              />

              {errors.surname?.message && (
                <div className="text-danger p-1">{errors.surname.message}</div>
              )}

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
                <div className="text-danger p-1">{errors.password.message}</div>
              )}

              <label htmlFor="task-title" className="form-label m-2">
                Powtórz hasło:
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                className="form-control"
                placeholder=""
              />

              {errors.confirmPassword?.message && (
                <div className="text-danger p-1">
                  {errors.confirmPassword.message}
                </div>
              )}

              <div className="text-center m-4">
                <button type="submit" className="btn btn-warning">
                  Załóż konto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
