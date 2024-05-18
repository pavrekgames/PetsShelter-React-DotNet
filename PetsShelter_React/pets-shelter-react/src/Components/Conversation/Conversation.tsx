import React, { useEffect, useState } from "react";
import "./Conversation.css";
import { Conversation as ConversationModel } from "../../Models/Conversation";
import { Message as MessageModel } from "../../Models/Message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/api";
import { useAppSelector } from "../../App/hooks";
import Message from "../Message/Message";
import ReactPaginate from "react-paginate";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

type Props = {};

type FormFields = {
  content: string;
  conversation_id: number;
};

const Conversation = (props: Props) => {


  const [conversation, setConversation] = useState<ConversationModel>({
    id: 0,
    user_name: "",
    user_surname: "",
    pet_name: "",
    pet_photo: "",
  });
  const [conversationMessages, setConversationMessages] = useState<Array<any>>(
    []
  );
  const [isSentMessage, setIsSentMessage] = useState<boolean>(false);

  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };

  const { id } = useParams();

  const [pageNumber, setPageNumber] = useState<number>(0);
  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(conversationMessages.length / itemsPerPage);

  const envelopeIcon = <FontAwesomeIcon icon={faEnvelope} />;

  const validationSchema = yup.object().shape({
    content: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema), mode: "onSubmit" });

  useEffect(() => {
    setIsSentMessage(false);
    getConversation();
    getMessages();
  }, [id, isSentMessage]);

  const getConversation = () => {
    if (typeof id === "string") {
      api
        .get(`conversations/${id}`, { headers })
        .then((res) => {
          setConversation(res.data);
        })
        .catch(() => console.log("Error"));
    }
  };

  const getMessages = () => {
    if (typeof id === "string") {
      api
        .get(`messages/${id}`, { headers })
        .then((res) => {
          setConversationMessages(res.data);
        })
        .catch(() => console.log("Error"));
    }
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const createMessage = () => {
    const message = new FormData();
    message.append("content", getValues("content"));
    message.append("conversation_id", conversation.id.toString());

    return message;
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const formData = createMessage();

    api
      .post("create-message", formData, { headers })
      .then((res) => {
        console.log(res);
        alertify.success("Wysłano wiadomość");
        setValue("content", "");
        setIsSentMessage(true);

      })
      .catch((error) => {
        alertify.error("Wystąpił problem podczas wysłania wiadomości!");
      });
  };

  const noConversation = (
    <>
      <div className="fa-3x text-center text-light justify-center flex flex-col">
        {envelopeIcon}
      </div>

      <div className="fa-3x text-center text-light justify-center flex flex-col">
        <h4>Zobacz wiadomości z dostępnych konwersacji</h4>
      </div>

      <div className="fa-3x text-center text-warning justify-center flex flex-col">
        <h4>lub</h4>
      </div>

      <div className="fa-3x text-center text-light justify-center flex flex-col">
        <h4>przeglądnij zwierzęta do adopcji i rozpocznij rozmowy</h4>
      </div>

      <div className="fa-3x text-center text-light justify-center flex flex-col">
        <div className="p-2">
          <button
            type="button"
            className="btn text-light btn-rounded"
            style={{ backgroundColor: "#6a994e" }}
          >
            Zwierzęta do adopcji
          </button>
        </div>
      </div>
    </>
  );

  const currentConversation = (
    <>
      <div className="text-center justify-center flex flex-col">
        <div className="p-2 text-light">
          <h5>
            Wiadomość o:
            <span className="text-warning">
              {" "}
              {conversation.pet_name}
            </span> z{" "}
            <span className="text-warning">
              {conversation.user_name} {conversation.user_surname}
            </span>
          </h5>
        </div>

        <div className="p-1 bg-primary">
          <div className="">
            <img
              src={conversation.pet_photo}
              alt="Pet"
              className="img-size-pet-message rounded-circle"
            />
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="ps-4 pt-4 pe-4 pb-3 text-light">
            <h4>Napisz wiadomość</h4>
            <textarea
              {...register("content")}
              className="form-control"
              id="message"
              rows={3}
            ></textarea>
          </div>

          <div>
            <button type="submit" className="btn btn-warning">
              Wyślij
            </button>
          </div>
        </form>
      </div>

      <div className="mx-auto row ps-4 pe-4 pt-5 pb-3">
        <div className="pb-2">
          {conversationMessages
            .slice(pagesVisited, pagesVisited + itemsPerPage)
            .map((conversationMessage, index) => (
              <Message key={index} conversationMessage={conversationMessage} />
            ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="bg-primary rounded border-l vh-100">
        {typeof id !== "string" ? noConversation : currentConversation}
      </div>

      <div className="app-background d-flex justify-content-center p-3">
        <ReactPaginate
          previousLabel="&laquo;"
          nextLabel="&raquo;"
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="paginator"
          previousLinkClassName="paginator-previous"
          nextLinkClassName="paginator-next"
          disabledClassName="paginator-disabled"
          activeClassName="paginator-active"
        />
      </div>
    </>
  );
};

export default Conversation;
