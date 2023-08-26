const AlertDeleteModal = ({ modalProps, setModalProps }) => {
  const { isOpen, handleYes, id } = modalProps;
  const handleClose = () => {
    setModalProps({ ...modalProps, isOpen: false, id: "" });
  };
  const handleYesAndClose = () => {
    handleYes(id);
    handleClose();
  };
  if (!isOpen) return <></>;
  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } bg-white min-w-[80%] md:min-w-[60%] min-h-[250px] absolute shadow-2xl  pt-5 flex-col`}
    >
      <button className="absolute right-4 top-3 " onClick={handleClose}>
        <span className="material-symbols-outlined text-3xl">close</span>
      </button>
      <h1 className="pl-10 font-semibold text-3xl">Delete Confirmation </h1>
      <hr className="h-[2px] w-full bg-gray-300 my-2" />
      <p className="pl-10 my-5 text-lg bg-red-200 w-[90%] mx-auto py-5 rounded">
        Are you sure you want to delete the user with id '
        <span className="text-red-800">{id}</span>'
      </p>
      <div className="w-[90%] mx-auto flex flex-row-reverse">
        <button
          className="bg-red-500 rounded-lg p-3 ml-10 text-white text-xl font-semibold"
          onClick={handleYesAndClose}
        >
          Confirm Delete
        </button>
        <button onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
};
export default AlertDeleteModal;
