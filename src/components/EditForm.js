import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup.string().required("* number is required"),
    email: yup.string().email().required("* email is required"),
    phone: yup
      .string()
      .required("*phone number is required")
      .matches(/^[0-9]+$/, "*Must be only digits")
      .min(7, "* contact must be minimum 7 digits"),
  })
  .required();

const EditForm = ({ setSubmitted, submitted, item, closeModal }) => {
  const defaultValues = {
    name: item?.name,
    email: item?.email,
    phone: item?.phone,
    dob: item?.dob,
    city: item?.address?.city,
    district: item?.address?.district,
    province: item?.address?.province,
    country: item?.address?.country,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = (data) => {
    const address = {
      city: data?.city,
      district: data?.district,
      province: data?.province,
      country: data?.country,
    };

    const finalData = {
      id: item?.id,
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      dob: data?.dob,
      address: address,
    };

    const previousData = localStorage.getItem("person");
    const previousJson = JSON.parse(previousData);
    let newData = [];
    if (previousJson) {
      newData = previousJson?.map((e) => {
        if (e.id === item?.id) {
          return finalData;
        } else {
          return e;
        }
      });
    }
    const json = JSON.stringify(newData);
    localStorage.setItem("person", json);
    setSubmitted(!submitted);
    reset(defaultValues);
    closeModal();
    alert("Edited user SuccessFully");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name:</label>
      <input {...register("name")} placeholder="Eg. Sandesh " />
      <p>{errors.name?.message}</p>
      <label>Email:</label>
      <input
        type="email"
        {...register("email")}
        placeholder="Eg. ram@gmail.com "
      />
      <p>{errors.email?.message}</p>
      <label>Contact:</label>
      <input {...register("phone")} placeholder="Eg. 9847491037 " />
      <p>{errors.phone?.message}</p>
      <label>Date of Birth:</label>
      <input type="date" {...register("dob")} />
      <br />
      <h7>Address</h7>
      <br />
      <label>City:</label>
      <input {...register("city")} />
      <br />
      <label>District:</label>
      <input {...register("district")} />
      <br />
      <label> Provience:</label>
      <select {...register("province")}>
        <br />
        <option value="province 1">province 1 </option>
        <option value="province 2">province 2 </option>
        <option value="province 3">province 3 </option>
        <option value="province 4">province 4 </option>
        <option value="province 5">province 5 </option>
        <option value="province 6">province 6 </option>
        <option value="province 7">province 7 </option>
      </select>
      <br />
      <label> Country:</label>
      <input value="Nepal" {...register("country")} /> <br /> <br />
      <input
        style={{
          float: "left",
          width: "40%",
          color: "#fff",
          backgroundColor: "blue",
          cursor: "pointer",
          border: "none",
          borderRadius: "5px",
          fontSize: "20px",
          padding: "10px 8px ",
        }}
        type="submit"
        value="Edit"
      />
    </form>
  );
};

export default EditForm;
