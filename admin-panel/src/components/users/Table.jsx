import { useState } from "react";
import Select from "react-select";
import dateFormatter from "../../utils/dateFormatter";
import { users as usersData } from "../../fakeData";
import AlertDeleteModal from "./AlertDeleteModal";

const options = [
  { value: "user", label: "user" },
  { value: "admin", label: "admin" },
];

const Table = ({ users, setModalProp }) => {
  const [isEditing, setIsEditing] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [alertDeleteModalProps, setAlertDeleteModalProps] = useState({
    isOpen: false,
    handleYes: handleConfirmDelete,
    id: "",
    title: "user",
  });

  const handleDeleteUser = (id) => {
    setAlertDeleteModalProps({ ...alertDeleteModalProps, isOpen: true, id });
  };

  function handleConfirmDelete(id) {
    console.log("deleting user: ", id);
  }

  const handleEditClick = (id) => {
    setIsEditing(id);
  };

  const handleSubmitClick = (id) => {
    setIsEditing("");
    if (selectedOption) {
      usersData = usersData.filter((user) => {
        if (user._id === id) {
          user.role = selectedOption.value;
        }
        return user;
      });
    }
  };

  return (
    <div className="w-full items-center overflow-x-auto px-5 md: flex md:justify-center relative">
      <table className="table-auto lg:min-w-full min-w-[800px]">
        <thead className="h-12 bg-yellow-400 text-lg font-semibold uppercase">
          <tr>
            <td className="pl-6 ">Id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Signup Date</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="h-10 bg-yellow-50 border-b-2 ">
              <td className="pl-6">{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {isEditing !== user._id ? (
                  user.role
                ) : (
                  <Select
                    defaultValue={{ value: user.role, label: user.role }}
                    onChange={setSelectedOption}
                    options={options}
                    className="w-32"
                  />
                )}
              </td>
              <td>{dateFormatter(user.createdAt)}</td>
              <td className="flex justify-around items-center ">
                <button onClick={() => setModalProp({ isOpen: true, user })}>
                  <span className="material-symbols-outlined py-2">
                    visibility
                  </span>
                </button>
                <button>
                  {isEditing === user._id ? (
                    <span
                      className="material-symbols-outlined text-3xl font-semibold"
                      onClick={() => handleSubmitClick(user._id)}
                    >
                      done
                    </span>
                  ) : (
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleEditClick(user._id)}
                    >
                      edit
                    </span>
                  )}
                </button>
                <button onClick={() => handleDeleteUser(user._id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AlertDeleteModal
        modalProps={alertDeleteModalProps}
        setModalProps={setAlertDeleteModalProps}
      />
    </div>
  );
};
export default Table;
