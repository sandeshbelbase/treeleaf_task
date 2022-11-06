import React, { useState } from "react";
import { Link } from "react-router-dom";
import ListTable from "../components/ListTable";
import UserForm from "../components/UserForm";

const Home = () => {
  const [submitted, setSubmitted] = useState(true);
  return (
    <>
      <UserForm submitted={submitted} setSubmitted={setSubmitted} />
      <ListTable submitted={submitted} setSubmitted={setSubmitted} />
      <Link to="profiles">
        <button>View Profiles</button>
      </Link>
    </>
  );
};

export default Home;
