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
  photo: object;
};

const EditSickPetPhotoPage = (props: Props) => {
  const navigate = useNavigate();
  const [pet, setPet] = useState<any>({});
  const [photo, setPhoto] = useState<File | undefined>();
  const [isPet, setIsPet] = useState<boolean>(false);
  const { id } = useParams();
  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };

  const validationSchema = yup.object().shape({
    photo: yup
      .mixed()
      .test("required", "Zdjęcie jest wymagane", (value: any) => {
        return value !== null && value.length > 0;
      }),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), mode: "all" });

  useEffect(() => {
    api
      .get(`sick-pets/edit/${id}`)
      .then((res) => setPet(res.data))
      .then(() => setIsPet(true))
      .then((pet) => console.log(pet));
  }, [isPet]);

  const cancelEditing = () => {
    navigate("/my-pets");
    alertify.warning("Anulowano zmianę zdjęcia");
  };

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setPhoto(target.files[0]);
  };

  const createForm = () => {
    const formData = new FormData();
    formData.append("photo", photo);

    return formData;
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const formData = createForm();

    api
      .post(`sick-pets/edit-photo/${id}`, formData, { headers })
      .then((res) => {
        console.log(res);
        alertify.success("Zmieniono zdjęcie");
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
            <h3>Zmień zdjęcie</h3>
          </div>

          <div className="p-4 text-center">
            <img src={pet.photo_path} alt="Pet" className="img-size-pet" />
          </div>

          <div className="text-light">
            <form
              className="form"
              encType="multipart/form-data"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="photo" className="form-label m-2">
                Wybierz nowe zdjęcie:
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
                    Zmień zdjęcie
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

export default EditSickPetPhotoPage;
