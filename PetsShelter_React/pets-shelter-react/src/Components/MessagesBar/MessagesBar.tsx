import React, { useEffect, useState } from "react";
import "./MessagesBar.css";
import { Conversation } from "../../Models/Conversation";
import MessageListElement from "../MessageListElement/MessageListElement";
import api from "../../Api/api";
import { useAppSelector } from "../../App/hooks";

type Props = {};

const MessagesBar = (props: Props) => {
  const [conversations, setConversations] = useState<Array<Conversation>>([]);
  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };

  const [search, setSearch] = useState<string>("");

  const searchItems = (item) => {
    if (search === "") {
      return item;
    } else if (item.user_name.toLowerCase().includes(search.toLowerCase())) {
      return item;
    } else if (item.user_surname.toLowerCase().includes(search.toLowerCase())) {
      return item;
    } else if (item.pet_name.toLowerCase().includes(search.toLowerCase())) {
      return item;
    }
  };

  useEffect(() => {
    api
      .get("conversations", { headers })
      .then((res) => setConversations(res.data));
    console.log("MessagesBar");
  }, []);

  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />

      <div className="rounded rounded bg-primary text-light vh-100">
        <div className="border-bottom pt-2 pb-2 d-flex justify-content-center">
          <h4>Wszystkie</h4>
        </div>

        <div>
          <div className="p-3">
            <input
              className="form-control"
              type="text"
              name="search"
              autoComplete="off"
              placeholder="&#xF002; Szukaj"
              style={{ fontFamily: "Arial, FontAwesome" }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="p-1">
            {conversations.filter(searchItems).map((conversation) => (
              <MessageListElement
                key={conversation.id}
                conversation={conversation}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagesBar;
