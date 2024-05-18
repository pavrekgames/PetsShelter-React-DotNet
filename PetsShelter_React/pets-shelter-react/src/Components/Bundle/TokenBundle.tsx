import React from "react";
import { Bundle } from "../../Models/Bundle";
import "./TokenBundle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

type Props = {};

const TokenBundle = ({ bundle }: { bundle: Bundle }) => {
  const dollarIcon = <FontAwesomeIcon className="pe-1" icon={faSackDollar} />;

  return (
    <div className="card bg-c-blue order-card text-light">
      <div className="card-block">
        <h5 className="m-b-20">{bundle.name}</h5>
        <h2 className="text-right">
          <i className="fa fa-cart-plus f-left"></i>
          <span>
            {bundle.tokens_count} {dollarIcon}
          </span>
        </h2>
        <p className="m-b-0">
          {bundle.price} {bundle.currency}
        </p>
        <a className="btn btn-success">Kup żetony</a>
      </div>
    </div>
  );
};

export default TokenBundle;
