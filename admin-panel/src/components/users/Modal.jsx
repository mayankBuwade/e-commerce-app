const Modal = ({ modalProp, setModalProp }) => {
  const { isOpen, user } = modalProp;
  if (!isOpen) return <></>;
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } bg-white min-w-[80%] md:min-w-[60%] min-h-[85%] absolute top-24 shadow-2xl`}
    >
      <button
        className="absolute right-4 top-3 "
        onClick={() => {
          setModalProp({ isOpen: false, user: {} });
        }}
      >
        <span className="material-symbols-outlined text-3xl">close</span>
      </button>
      <div className="flex ">
        <div className="w-80  bg-yellow-100 flex flex-col">
          <div className="my-8 w-[180px] h-[180px] rounded-full overflow-hidden mx-auto">
            <img width={180} src={user.photo.secure_url} alt="user image" />
          </div>
          <div className="ml-6">
            <p className="my-2 text-xl font-semibold uppercase">
              Name:- {user.name}
            </p>
            <p className="my-2 text-xl font-semibold uppercase">
              Email:- <span className="lowercase">{user.email}</span>
            </p>
            <p className="my-2 text-xl font-semibold uppercase">
              Role:- {user.role}
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default Modal;
