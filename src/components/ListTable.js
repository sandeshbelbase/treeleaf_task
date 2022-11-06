import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import EditForm from "./EditForm";
import { Link, useLocation } from "react-router-dom";

const ListTable = ({ setSubmitted, submitted }) => {
  const [displayData, setDisplayData] = useState([]);
  const [editItem, setEditItem] = useState();
  const [sorted, setSorted] = useState(false);

  const location = useLocation();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    const data = localStorage.getItem("person");
    data && !sorted && setDisplayData(JSON.parse(data));
  }, [submitted, sorted]);

  const handleDelete = (item) => {
    const data = displayData?.filter((e) => item?.id !== e?.id);
    setDisplayData(data);
    localStorage.setItem("person", JSON.stringify(data));
  };

  const handleEdit = (item) => {
    setSorted(false);
    setEditItem(item);
    openModal();
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSort = () => {
    setSorted(true);
    const sorted = displayData.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
    setDisplayData(sorted);
  };

  return (
    <>
      <h2 className="title">Treeleaf User Data</h2>

      <div className="list">
        <button onClick={handleSort}> Sort by Name</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>DOB</th>
              <th>City</th>
              <th>District</th>
              <th>Province</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.phone}</td>
                  <td>{item?.dob}</td>
                  <td>{item?.address?.city}</td>
                  <td>{item?.address?.district}</td>
                  <td>{item?.address?.province}</td>
                  <td>{item?.address?.country}</td>

                  <td>
                    <button
                      style={{
                        color: "#fff",
                        backgroundColor: "blue",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        outline: "none",
                      }}
                      onClick={() => handleEdit(item)}
                    >
                      Edit{" "}
                    </button>
                    <button
                      style={{
                        color: "#fff",
                        backgroundColor: "red",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        outline: "none",
                      }}
                      onClick={() => handleDelete(item)}
                    >
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {location?.pathname === "/" && (
          <Link to="profiles">
            <button>View Profiles</button>
          </Link>
        )}

        {location?.pathname === "/profiles" && (
          <Link to="/">
            <span
              style={{
                color: "blue",
                padding: "10px 0px",
                display: "block",
                outline: "none",
              }}
            >
              go back
            </span>
          </Link>
        )}
      </div>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <EditForm
            item={editItem}
            setSubmitted={setSubmitted}
            submitted={submitted}
            closeModal={closeModal}
          />
        </Modal>
      </div>
    </>
  );
};

export default ListTable;
