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
  disease: string;
  required_tokens: number;
  status: string;
  photo: object;
};

const AddSickPetPage = (props: Props) => {
  const navigate = useNavigate();
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
    disease: yup
      .string()
      .required("Wpisanie choroby jest obowiązkowe")
      .min(3, "Nazwa choroby musi mieć minimalnie 3 znaki"),
    required_tokens: yup
      .number()
      .required("Liczba żetonów nie może być pusta")
      .min(1, "Minimalna liczba wymaganych żetonów to 1"),
    status: yup.string(),
    photo: yup
    .mixed()
    .test("required", "Zdjęcie jest wymagane", (value: any) => {
      return value !== null && value.length > 0;
    }),
  });

  const {
    register,
    handleSubmit,
    getValues,
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
    formData.append("disease", getValues("disease"));
    formData.append("required_tokens", getValues("required_tokens").toString());
    formData.append("status", "Aktywne");
    formData.append("photo", photo);

    return formData;
  }

  const onSubmit: SubmitHandler<FormFields> = (data) => {

    const formData = createForm();

    api
      .post("add-sick-pet", formData, { headers })
      .then((res) => {
        console.log(res);
        alertify.success("Dodano chore zwierzę");
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
            <h3>Dodaj chore zwierzę</h3>
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

export default AddSickPetPage;
