import React, { useEffect, useState } from "react";
import "./MessageListElement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Conversation } from "../../Models/Conversation";
import api from "../../Api/api";
import { useAppSelector } from "../../App/hooks";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const MessageListElement = ({
  conversation,
}: {
  conversation: Conversation;
}) => {
  const navigate = useNavigate();
  const [messagesCount, setMessagesCount] = useState<number>(0);

  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };

  const id = conversation.id;
  const routeId = useParams();
  const userIcon = <FontAwesomeIcon icon={faUser} />;

  const messagesCountClass =
    "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ";

  useEffect(() => {
    getConversationMessagesCount();
  }, [routeId]);

  const getConversationMessagesCount = () => {
    api
      .get(`messages-count/${id}`, { headers })
      .then((res) => setMessagesCount(res.data.messagesCount));
  };

  const selectConversation = () => {
    navigate(`/messages/${id}`, {replace: true});
  }

  return (
    <div
      className="p-3 bg-success border d-flex justify-content-between"
      id="message-element"
      onClick={selectConversation}
    >
      <div className="fa-1x d-inline pe-2">
        {userIcon} {conversation.user_name} {conversation.user_surname}
      </div>

      <div className="d-inline ps-2">{conversation.pet_name}</div>

      <div className="d-inline ps-2 position-relative">
        <img
          src={conversation.pet_photo}
          alt="Pet"
          className="img-message-list-size rounded-circle"
        />

        <span
          className={
            messagesCount > 0
              ? messagesCountClass + "visible"
              : messagesCountClass + "invisible"
          }
        >
          {messagesCount}
        </span>
      </div>
    </div>
  );
};

export default MessageListElement;
