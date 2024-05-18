import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../App/hooks";
import * as alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

type Props = {};

type FormFields = {
  name: string;
  species: string;
  disease: string;
  required_tokens: number;
};

const EditSickPetPage = (props: Props) => {
  const navigate = useNavigate();
  const [pet, setPet] = useState<any>({});
  const [isPet, setIsPet] = useState<boolean>(false);
  const { id } = useParams();
  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Imię jest wymagane"),
    species: yup
      .string()
      .required("Gatunek jest wymagany")
      .min(3, "Gatunek musi mieć minimalnie 3 znaki"),
    disease: yup
      .string()
      .required("Wpisanie choroby jest obowiązkowe")
      .min(3, "Nazwa choroby musi mieć minimalnie 3 znaki"),
    required_tokens: yup
      .number()
      .required("Liczba żetonów nie może być pusta")
      .min(1, "Minimalna liczba wymaganych żetonów to 1"),
  });

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), mode: "all" });

  useEffect(() => {
    api
      .get(`sick-pets/edit/${id}`)
      .then((res) => setPet(res.data))
      .then(handlePet)
      .then(() => setIsPet(true))
      .then((pet) => console.log(pet));
  }, [isPet]);

  const handlePet = () => {
    setValue("name", pet.name);
    setValue("species", pet.species);
    setValue("disease", pet.disease);
    setValue("required_tokens", pet.required_tokens);
  };

  const cancelEditing = () => {
    navigate("/sick-pets-manager");
    alertify.warning("Anulowano edycję");
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const formData = getValues();

    api
      .post(`sick-pets/edit/${id}`, formData, { headers })
      .then((res) => {
        console.log(res);
        alertify.success("Edytowano chore zwierzę");
        navigate("/sick-pets-manager");
      })
      .catch((error) => {
        alertify.error("Wystąpił problem!");
      });
  };

  return (
    <div className="app-background center">
      <div className="mx-auto row justify-content-center px-6 pt-5">
        <div className="col-lg-5 rounded">
          <div className="p-4 text-light text-center">
            <h3>Edytuj zwierzę</h3>
          </div>

          <div className="text-light">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="pet-name" className="form-label m-2">
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

              <label htmlFor="species" className="form-label m-2">
                Gatunek:
              </label>
              <input
                {...register("species")}
                type="text"
                className="form-control"
                placeholder=""
              />

              {errors.species?.message && (
                <div className="text-danger p-1">{errors.species.message}</div>
              )}

              <label htmlFor="disease" className="form-label m-2">
                Choroba:
              </label>
              <input
                {...register("disease")}
                type="text"
                className="form-control"
                placeholder=""
              />

              {errors.disease?.message && (
                <div className="text-danger p-1">{errors.disease.message}</div>
              )}

              <label htmlFor="required_tokens" className="form-label m-2">
                Wymagana liczba żetonów:
              </label>
              <input
                {...register("required_tokens")}
                type="number"
                className="form-control"
                placeholder=""
              />

              {errors.required_tokens?.message && (
                <div className="text-danger p-1">
                  {errors.required_tokens.message}
                </div>
              )}

              <div className="d-flex flex-row justify-content-center p-4">
                <div className="text-center me-2 mt-4 d-inline">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={cancelEditing}
                  >
                    Anuluj
                  </button>
                </div>

                <div className="text-center m-2 mt-4 d-inline">
                  <button type="submit" className="btn btn-info">
                    Edytuj
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSickPetPage;
