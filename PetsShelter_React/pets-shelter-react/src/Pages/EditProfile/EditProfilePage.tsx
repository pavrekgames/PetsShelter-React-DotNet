import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../App/hooks";
import { useAppDispatch } from "../../App/hooks";
import * as alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { setUser } from "../../Features/userSlice";

type Props = {};

type FormFields = {
  name: string;
  surname: string;
  email: string;
};

type PasswordFormFields = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

const EditProfilePage = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState<any>({});
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };

  useEffect(() => {
    api
      .post("me", null, { headers })
      .then((res) => setAuthUser(res.data))
      .then(handleUser)
      .then(() => setIsUser(true))
      .then((user) => console.log("UseEffect", user));
  }, [isUser]);

  const handleUser = () => {
    setValue("name", authUser.name);
    setValue("surname", authUser.surname);
    setValue("email", authUser.email);
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Imię jest wymagane")
      .max(25, "Podane imię jest za długie"),
    surname: yup
      .string()
      .required("Nazwisko jest wymagane")
      .max(25, "Podane nazwisko jest za długie"),
    email: yup.string(),
  });

  const passwordValidationSchema = yup.object().shape({
    password: yup.string().required("Stare hasło jest wymagane"),
    newPassword: yup
      .string()
      .required("Nowe hasło jest wymagane")
      .min(6, "Nowe hasło musi mieć minimalnie 6 znaków"),
    confirmNewPassword: yup
      .string()
      .required("Pole nie może być puste")
      .oneOf([yup.ref("newPassword"), null], "Hasła nie są takie same"),
  });

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), mode: "all" });

  const {
    register: password,
    handleSubmit: handlePasswordSubmit,
    setError: setPasswordError,
    setValue: setPasswordValue,
    getValues: getPasswordValue,
    formState: { errors: passwordErrors },
  } = useForm({ resolver: yupResolver(passwordValidationSchema), mode: "all" });



  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const formData = getValues();

    api
      .post(`edit-profile`, formData, { headers })
      .then((res) => {
        console.log(res);
        dispatch(setUser(res.data));
        alertify.success("Edytowano profil");
        navigate("/");
      })
      .catch((error) => {
        alertify.error("Błąd edycji");
      });
  };

  const onPasswordSubmit: SubmitHandler<PasswordFormFields> = (data) => {

    const formData = getPasswordValue();

    api
      .post(`change-password`, formData, { headers })
      .then((res) => {
        console.log(res);
        alertify.success("Zmieniono hasło");
        navigate("/");
      })
      .catch((error) => {
        setPasswordError("root", {
          message: "Stare hasło jest nieprawidłowe!",
        });
        alertify.error("Wystąpił problem");
      });
  };

  return (
    <div className="app-background center ">
      <div className="mx-auto row justify-content-center px-6 pt-5">
        <div className="col-lg-5 rounded ">
          <div className="p-4 text-light text-center">
            <h3>Edycja profilu</h3>
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
                className="form-control bg-secondary text-light"
                placeholder=""
                readOnly
              />

              <div className="text-center m-4">
                <button type="submit" className="btn btn-warning">
                  Edytuj profil
                </button>
              </div>
            </form>

            {!isChangingPassword && (
              <div className="border-top">
                <div className="p-3 text-center">
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={() => setIsChangingPassword(true)}
                  >
                    Zmień hasło
                  </button>
                </div>
              </div>
            )}

            {isChangingPassword && (
              <form
                className="form"
                onSubmit={handlePasswordSubmit(onPasswordSubmit)}
              >
                <div className="pb-5">
                  <div className="p-4 text-light text-center">
                    <h4>Zmień hasło</h4>
                  </div>

                  {passwordErrors.root?.message && (
                    <div className="text-danger p-1">{passwordErrors.root.message}</div>
                  )}

                  <label htmlFor="task-title" className="form-label m-2">
                    Stare Hasło:
                  </label>
                  <input
                    {...password("password")}
                    type="password"
                    className="form-control"
                    placeholder=""
                  />

                  {passwordErrors.password?.message && (
                    <div className="text-danger p-1">
                      {passwordErrors.password.message}
                    </div>
                  )}

                  <label htmlFor="task-title" className="form-label m-2">
                    Nowe Hasło:
                  </label>
                  <input
                    {...password("newPassword")}
                    type="password"
                    className="form-control"
                    placeholder=""
                  />

                  {passwordErrors.newPassword?.message && (
                    <div className="text-danger p-1">
                      {passwordErrors.newPassword.message}
                    </div>
                  )}

                  <label htmlFor="task-title" className="form-label m-2">
                    Powtórz nowe hasło:
                  </label>
                  <input
                    {...password("confirmNewPassword")}
                    type="password"
                    className="form-control"
                    placeholder=""
                  />

                  {passwordErrors.confirmNewPassword?.message && (
                    <div className="text-danger p-1">
                      {passwordErrors.confirmNewPassword.message}
                    </div>
                  )}

                  <div className="text-center m-4">
                    <button type="submit" className="btn btn-primary">
                      Potwierdź
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
