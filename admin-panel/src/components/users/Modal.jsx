const Modal = ({ modalProp, setModalProp }) => {
  console.log(modalProp.user);

  return (
    <div
      className={`${
        modalProp.isOpen ? "flex" : "hidden"
      } bg-white min-w-[80%] md:min-w-[60%] min-h-[85%] absolute top-24 shadow-2xl`}
    >
      <button
        className="absolute right-1 top-1"
        onClick={() => {
          setModalProp({ isOpen: false, user: {} });
        }}
      >
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
};
export default Modal;
