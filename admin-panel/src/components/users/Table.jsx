import dateFormatter from "../../utils/dateFormatter";

const Table = ({ users }) => {
  return (
    <div className="w-full items-center overflow-x-auto px-5 md: flex md:justify-center">
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
              <td>{user.role}</td>
              <td>{dateFormatter(user.createdAt)}</td>
              <td className="flex justify-around items-center ">
                <button>
                  <span className="material-symbols-outlined py-2">
                    visibility
                  </span>
                </button>
                <button>
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
