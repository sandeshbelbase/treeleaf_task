import React, { useState } from "react";
import ListTable from "../components/ListTable";
import UserForm from "../components/UserForm";

const Home = () => {
  const [submitted, setSubmitted] = useState(true);
  return (
    <>
      <UserForm submitted={submitted} setSubmitted={setSubmitted} />
      <ListTable submitted={submitted} setSubmitted={setSubmitted} />
    </>
  );
};

export default Home;
