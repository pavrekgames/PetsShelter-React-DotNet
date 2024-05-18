import React, { useEffect, useState } from "react";
import "./TokensPage.css";
import { Bundle } from "../../Models/Bundle";
import TokenBundle from "../../Components/Bundle/TokenBundle";
import api from "../../Api/api";
import { useAppSelector } from "../../App/hooks";

type Props = {};

const TokensPage = (props: Props) => {
  const [bundles, setBundles] = useState<Array<Bundle>>([]);
  const token = useAppSelector((state) => state.token.value);
  const headers = {
    Authorization: "Bearer " + token,
  };

  useEffect(() => {
    api.get("bundles", {headers}).then((res) => setBundles(res.data));
  }, []);

  return (
    <>
      <div className="app-background text-center text-light p-5">
        <h2> Doładuj żetony</h2>
      </div>

      <div className="mx-auto row app-background px-6 justify-content-center text-center">
        <div className="col-md-4 col-xl-3">
          {bundles.map((bundle) => (
            <TokenBundle key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TokensPage;
