import React from 'react'
import { GridLoader } from "react-spinners";

type Props = {}

const spinnerOveride = {
    display: "block",
    margin: "100px auto",
  };

const Spinner = ({isLoading}) => {
  return (
    <GridLoader
    color="#6a994e"
    loading={isLoading}
    cssOverride={spinnerOveride}
    size={30}
  />
  )
}

export default Spinner