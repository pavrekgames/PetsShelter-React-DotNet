import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import api from "../../Api/api";

type Props = {};

type FormFields = {
  name: string;
  email: string;
};

const ResetPasswordPage = (props: Props) => {
  const [hasResetSend, setHasResetSend] = useState<boolean>(false);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Imię jest wymagane"),
    email: yup
      .string()
      .required("E-mail jest wymagany")
      .email("Wpisz poprawny adres e-mail"),
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
    formData.append("email", getValues("email"));

    return formData;
  }

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const formData = createForm();
    
    api.post("reset-password", formData).then((res) => {
      console.log(res);
      setHasResetSend(true);
      alertify.success("Wysłano nowe hasło");
    })
    .catch((error) => {
      alertify.error("Wystąpił problem");
      setError("root", {
        message: "Nie istnieje konto o podanych danych",
      });
    })
  };

  const notSendTemplate = (
    <>
      <div className="text-center px-7 pt-2">
        <h4>
          Podaj imię oraz adres e-mail, na które zarejestrowałeś swoje konto. Na
          podany adres e-mail zostanie wysłane nowe hasło
        </h4>
      </div>

      <div className="row justify-content-center px-6 pt-5">
        <div className="col-lg-5 rounded ">
          <div className="text-light">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name" className="form-label m-2">
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

              <div className="text-center m-4">
                <button type="submit" className="btn btn-warning">
                  Wyślij
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  const sendTemplate = (
    <>
      <div className="text-center px-7 pt-2">
        <h4> Na podany adres e-mail zostało wysłane nowe hasło.</h4>
      </div>

      <div className="d-flex justify-content-center pt-4">
        <div className="p-2 center px-7">
          <button
            type="button"
            className="btn text-light btn-rounded"
            style={{ backgroundColor: "#6a994e" }}
          >
            Powrót do logowania
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="app-background center text-light p-5">
      <div className="text-center">
        <h2> Resetowanie hasła</h2>
      </div>

      <div>{!hasResetSend ? notSendTemplate : sendTemplate}</div>
    </div>
  );
};

export default ResetPasswordPage;
