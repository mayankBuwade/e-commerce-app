import { useEffect, useState } from "react";
import Table from "../components/users/Table";
import { users } from "../fakeData";
import Modal from "../components/users/Modal";

const Users = () => {
  const [searchQ, setSearchQ] = useState("");
  const [filteredData, setFilteredData] = useState(users);
  const [modalProp, setModalProp] = useState({ isOpen: false, user: {} });

  const handleClick = () => {
    const searchedData = users.filter((user) => {
      for (const key in user) {
        if (typeof user[key] === "string" && user[key].search(searchQ) !== -1) {
          return user;
        }
      }
    });
    setFilteredData(searchedData);
  };

  useEffect(() => {
    if (searchQ === "") {
      setFilteredData(users);
    }
  }, [searchQ]);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="my-12 md:w-3/5 w-full px-5 flex justify-center items-center relative">
        <input
          placeholder="search a specific user"
          className="h-10 pl-3 border-2 border-slate-400 rounded min-w-full"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
        />
        <button className="absolute right-8 top-2 z-0" onClick={handleClick}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
      <Table users={filteredData} setModalProp={setModalProp} />
      <Modal modalProp={modalProp} setModalProp={setModalProp} />
    </div>
  );
};
export default Users;
