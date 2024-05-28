import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
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
  photo: object;
  user_id: number;
};

const AddPetPage = (props: Props) => {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.user.id);
  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };
  const [photo, setPhoto] = useState<File | undefined>();

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
    photo: yup
    .mixed()
    .test("required", "Zdjęcie jest wymagane", (value: any) => {
      return value !== null && value.length > 0;
    }),
    user_id: yup.number()
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), mode: "all" });

  const onFileChange = (e: React.FormEvent<HTMLInputElement>)  => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }

    setPhoto(target.files[0]);
  }

  const createForm = () =>{
    const formData = new FormData();
    formData.append("name", getValues("name"));
    formData.append("species", getValues("species"));
    formData.append("race", getValues("race"));
    formData.append("size", getValues("size"));
    formData.append("description", getValues("description"));
    formData.append("photo", photo);
    formData.append("userId", userId.toString());

    return formData;
  }

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    
    console.log('photo', photo);
    const formData = createForm();

    api
      .post("add-pet", formData, { headers })
      .then((res) => {
        console.log(res);
        alertify.success("Dodano zwierzę");
        navigate("/");
      })
      .catch((error) => {
        alertify.error("Wystąpił problem!");
      });
  };

  return (
    <div className="app-background center">
      <div className="mx-auto row justify-content-center px-6 pt-5">
        <div className="col-lg-5 rounded ">
          <div className="p-4 text-light text-center">
            <h3>Dodaj zwierzę</h3>
          </div>

          <div className="text-light">
            <form
              className="form"
              encType="multipart/form-data"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                  defaultChecked = {true}
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

              <label htmlFor="photo" className="form-label m-2">
                Dodaj zdjęcie:
              </label>
              <input
                {...register("photo")}
                type="file"
                className="form-control"
                id="photo"
                name="photo"
                onChange={onFileChange}
              />

              {errors.photo?.message && (
                <div className="text-danger p-1">{errors.photo.message}</div>
              )}

              <div className="text-center m-4">
                <button type="submit" className="btn btn-warning">
                  Dodaj
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPetPage;
