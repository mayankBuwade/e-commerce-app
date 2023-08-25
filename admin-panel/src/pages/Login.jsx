import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/thunks/userThunks";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.token;
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const error = useSelector((state) => {
    return state.user.error;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex justify-center items-center flex-col bg-slate-200 p-10 rounded-lg shadow-lg m-5">
        <h1 className="mb-8 text-3xl font-semibold">Login</h1>
        <form
          className="flex flex-col justify-around items-center sm:min-w-[420px] min-h-[360px]"
          onSubmit={(e) => handleSubmit(e)}
          method="post"
        >
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            className="text-lg h-14 pl-3 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="enter your password"
            className="text-lg h-14 pl-3 rounded  w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-slate-950 text-white px-24 py-3 text-lg font-semibold rounded hover:bg-slate-800"
          >
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
          {user && <Navigate to="/admin" replace={true} />}
        </form>
      </div>
    </div>
  );
};

export default Login;
