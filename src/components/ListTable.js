import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import EditForm from "./EditForm";

const ListTable = ({ setSubmitted, submitted }) => {
  const [displayData, setDisplayData] = useState([]);
  const [editItem, setEditItem] = useState();
  const [sorted, setSorted] = useState(false);

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
      <button onClick={handleSort}> Sort by Name</button>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
        {displayData?.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.phone}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit </button>
                <button onClick={() => handleDelete(item)}>Delete </button>
              </td>
            </tr>
          );
        })}
      </table>

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
