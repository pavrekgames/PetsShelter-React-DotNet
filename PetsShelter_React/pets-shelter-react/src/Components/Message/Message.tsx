import React, { useEffect, useState } from "react";
import { ConversationMessage } from "../../Models/ConversationMessage";
import { useAppSelector } from "../../App/hooks";
import { useParams } from "react-router-dom";

type Props = {};

const Message = ({
  conversationMessage,
}: {
  conversationMessage: ConversationMessage;
}) => {
  const [isSenderMessage, setIsSenderMessage] = useState<boolean>(false);
  const userId = useAppSelector((state) => state.user.id);

  const { id } = useParams();

  useEffect(() => {
    checkSender();
  }, [id]);

  const checkSender = () => {
    if (conversationMessage.sender_id == userId) {
      setIsSenderMessage(true);
    } else {
      setIsSenderMessage(false);
    }
  };

  return (
    <div
      className={
        isSenderMessage
          ? "text-light text-start rounded float-end bg-secondary"
          : "text-light text-start rounded float-start theme-bgr"
      }
    >
      <h6 className="ps-2 pe-2 pt-1 pb-1 text-warning">
        <b>
          {conversationMessage.user_name} {conversationMessage.user_surname}
        </b>
        <span className="text-dark"> {conversationMessage.date}</span>
      </h6>
      <h5 className="p-2">{conversationMessage.content}</h5>
    </div>
  );
};

export default Message;
