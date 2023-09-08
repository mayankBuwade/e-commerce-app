import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import PlaceholderLoading from "react-placeholder-loading";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchUserDetails,
  updateSelfDetails,
} from "../redux/thunks/userThunks";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const isLoading = useSelector((state) => state.user.loading);
  const token = useSelector((state) => state.user.token);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: user.name,
    role: user.role,
    email: user.email,
  });

  const getUserImage = () => {
    const imgRound =
      "https://res.cloudinary.com/dfigiphfg/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1693036667/users/";
    const defaultImage = "5907_awvfjc.jpg";
    const userImage = user?.photo?.secure_url?.split("/").pop();
    if (userImage) {
      return imgRound + userImage;
    }
    return imgRound + defaultImage;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    const photo = event.target.files[0];
    console.log(photo);
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      photo: photo,
    }));
  };

  const handleSaveChange = () => {
    dispatch(
      updateSelfDetails({ token, id: user._id, userDetails: newUserData })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(fetchUserDetails({ token, id: user._id })).then((res) => {
          console.log(res);
        });
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex bg-red-300 shadow-2xl w-full flex-col m-auto md:flex-row md:max-w-[950px] md:min-h-[600px] ">
        <div className="bg-red-500 lg:min-w-[260px] flex flex-col items-center">
          {isLoading ? (
            <div className="my-7 relative ">
              <PlaceholderLoading shape="circle" width={200} height={200} />
            </div>
          ) : (
            <div
              style={{
                backgroundImage: `url(${getUserImage()})`,
                backgroundSize: "200px 200px",
              }}
              className=" rounded-full  min-w-[200px] min-h-[200px] my-7 relative "
            >
              <div
                className={`${
                  isEditing ? "absolute" : "hidden"
                }  bottom-5 right-8 text-3xl text-white mix-blend-difference`}
              >
                <label htmlFor="name">
                  <span className="material-symbols-outlined text-4xl font-bold ">
                    add_a_photo
                  </span>
                </label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="hidden"
                  id="name"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
          )}
          {isEditing ? (
            <input
              value={newUserData.name}
              onChange={handleInputChange}
              className="rounded-lg pl-4"
              name="name"
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>
        <div className="flex flex-col p-7 relative w-full">
          {isEditing ? (
            <div className="text-2xl font-semibold tracking-wide h-full">
              <div className="mt-8 flex items-center">
                <label className="mr-4">Email:</label>
                <input
                  onChange={handleInputChange}
                  value={newUserData.email}
                  name={"email"}
                  className="h-10 w-full rounded-md pl-4 mt-2"
                />
              </div>
              <div className="mt-8 flex items-center">
                <label className="mr-4">Role:</label>
                <input
                  onChange={handleInputChange}
                  value={newUserData.role}
                  name={"role"}
                  className="h-10 w-full rounded-md pl-4 mt-2"
                />
              </div>
              <div className="absolute right-1 bottom-1">
                <button
                  className="bg-green-600 p-4 rounded-lg text-xl font-semibold text-white tracking-wide hover:bg-green-700  mr-5 mb-4"
                  onClick={handleSaveChange}
                >
                  Save Data
                </button>
                <button
                  className="bg-red-600 p-4 rounded-lg text-xl font-semibold text-white tracking-wide hover:bg-red-700   mr-5 mb-4"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="mt-8 text-2xl font-semibold tracking-wide">
                Email:- {user.email}
              </p>
              <p className="mt-8 text-2xl font-semibold tracking-wide">
                Role:- {user.role}
              </p>
              <button
                className="bg-red-600 py-4 px-8 rounded-lg text-xl font-semibold text-white tracking-wide hover:bg-red-700   mr-5 mb-4 absolute right-1 bottom-1"
                onClick={() => setIsEditing(!isEditing)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
