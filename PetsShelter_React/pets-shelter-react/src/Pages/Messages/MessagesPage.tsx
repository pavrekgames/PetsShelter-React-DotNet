import React, { useEffect } from "react";
import "./MessagesPage.css"
import MessagesBar from "../../Components/MessagesBar/MessagesBar";
import Conversation from "../../Components/Conversation/Conversation";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};


const MessagesPage = (props: Props) => {

  const { id } = useParams();

  useEffect(() => {
    console.log("MessagesPage");
  }, [{id}]);

  return (
    <>
      <div className="app-background center ">
        <div className="mx-auto row justify-content-center px-6 pt-5">
          <div className="col-lg-5 rounded ">
            <div className="pb-4 text-light text-center">
              <h3>Wiadomości</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="app-background px-6">
    <div className="mx-auto row pt-2">

      <div className="col-4">
        <MessagesBar />
      </div>

      <div className="col-8">
        <Conversation />
      </div>

    </div>
  </div>

    </>
  );
};

export default MessagesPage;
