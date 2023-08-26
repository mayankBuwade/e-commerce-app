import { useState } from "react";
import Table from "../components/users/Table";
import { users } from "../fakeData";

const Users = () => {
  const [searchQ, setSearchQ] = useState("");
  const [filteredData, setFilteredData] = useState(users);

  const handleClick = () => {
    const searchedData = users.filter((user) => {
      for (const key in user) {
        if (user.hasOwnProperty(key)) {
          if (typeof user[key] === "string" && searchQ in user[key]) {
            console.log(user);
            return user;
          }
        }
      }
      console.log(searchedData);
    });
    setFilteredData(searchedData);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="my-12 md:w-3/5 w-full px-5 flex justify-center items-center relative">
        <input
          placeholder="search a specific user"
          className="h-10 pl-3 border-2 border-slate-400 rounded min-w-full"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
        />
        <button className="absolute right-8 top-2" onClick={handleClick}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
      <Table users={filteredData} />
    </div>
  );
};
export default Users;
