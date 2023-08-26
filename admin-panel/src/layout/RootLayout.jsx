import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { clearUser } from "../redux/slices/userDataSlice";

const RootLayout = () => {
  const [toggleMenu, setToggleMenu] = useState("hidden");
  const user = useSelector((state) => {
    return state.user.token;
  });
  const dispatch = useDispatch();

  const handleMenuToggler = () => {
    toggleMenu === "hidden" ? setToggleMenu("block") : setToggleMenu("hidden");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearUser());
  };

  return (
    <Fragment>
      <header className="bg-slate-950 h-14 text-white flex justify-center">
        <div className="flex max-w-screen-xl w-full mx-auto ">
          <button className="lg:hidden mr-auto" onClick={handleMenuToggler}>
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="group ml-auto flex flex-col mr-4">
            <button className="ml-auto mt-3">
              <span className="material-symbols-outlined ml-auto">person</span>
            </button>
            <div className="hidden group-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg hover:z-50 relative top-2 text-black p-2 rounded-md">
              <a className="px-5 py-3 hover:bg-gray-200" href="#">
                Profile
              </a>
              <a
                className="px-5 py-3 hover:bg-gray-200"
                href="#"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </header>
      <div className="500 w-full min-h-[calc(100vh-56px)] flex overflow-hidden">
        <div
          className={`${toggleMenu} w-44  bg-slate-900 text-white lg:block lg:w-64`}
        >
          <nav className="flex flex-col min-w-full">
            <NavLink
              to="/"
              className="aria-[current=page]:text-blue-400 hover:bg-slate-700
              aria-[current=page]:bg-slate-800 text-xl p-5"
            >
              Home
            </NavLink>
            <NavLink
              to="users"
              className="aria-[current=page]:text-blue-400 hover:bg-slate-700
              aria-[current=page]:bg-slate-800 text-xl p-5"
            >
              Users
            </NavLink>
            <NavLink
              to="allproducts"
              className="aria-[current=page]:text-blue-400 hover:bg-slate-700
              aria-[current=page]:bg-slate-800 text-xl p-5"
            >
              All Products
            </NavLink>
            <NavLink
              to="addproduct"
              className="aria-[current=page]:text-blue-400 hover:bg-slate-700
              aria-[current=page]:bg-slate-800 text-xl p-5"
            >
              Add a Product
            </NavLink>
          </nav>
        </div>
        {!user ? <Navigate to="/login" replace={true} /> : <Outlet />}
      </div>
    </Fragment>
  );
};
export default RootLayout;
