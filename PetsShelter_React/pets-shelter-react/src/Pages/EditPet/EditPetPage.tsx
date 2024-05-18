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
  race: string;
  size: string;
  description?: string;
};

const EditPetPage = (props: Props) => {
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
    race: yup
      .string()
      .required("Rasa jest wymagana")
      .min(3, "Rasa musi mieć minimalnie 3 znaki"),
    size: yup.string(),
    description: yup.string().nullable(),
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

    api.get(`my-pets/edit/${id}`)
    .then((res) => setPet(res.data))
    .then(handlePet)
    .then(() => setIsPet(true))
    .then((pet) => console.log(pet));

  }, [isPet]);

  const handlePet = () => {
    setValue("name", pet.name);
    setValue("species", pet.species);
    setValue("race", pet.race);
    setValue("size", pet.size);
    setValue("description", pet.description);
  }

  const cancelEditing = () => {
    navigate("/my-pets");
    alertify.warning("Anulowano edycję");
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const formData = getValues();

    api
      .post(`my-pets/edit/${id}`, formData, { headers })
      .then((res) => {
        console.log(res);
        alertify.success("Edytowano zwierzę");
        navigate("/my-pets");
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
              {errors.root?.message && (
                <div className="text-danger p-1">
                  {errors.root.message}
                </div>
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

              <label htmlFor="race" className="form-label m-2">
                Rasa:
              </label>
              <input
                {...register("race")}
                type="text"
                className="form-control"
                placeholder=""
              />

              {errors.race?.message && (
                <div className="text-danger p-1">{errors.race.message}</div>
              )}

              <div className="mt-3 ms-2">
                <label htmlFor="size" className="form-label">
                  Rozmiar:
                </label>
                <input
                  {...register("size")}
                  type="radio"
                  className="form-check-input m-2"
                  id="small"
                  name="size"
                  value="Mały"
                />
                Mały
                <input
                  {...register("size")}
                  type="radio"
                  className="form-check-input m-2"
                  id="medium"
                  name="size"
                  value="Średni"
                />
                Średni
                <input
                  {...register("size")}
                  type="radio"
                  className="form-check-input m-2"
                  id="big"
                  name="size"
                  value="Duży"
                />
                Duży
              </div>

              <label htmlFor="description" className="form-label m-2">
                Opis:
              </label>
              <textarea
                {...register("description")}
                className="form-control"
                id="description"
                rows={3}
              ></textarea>

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

export default EditPetPage;
