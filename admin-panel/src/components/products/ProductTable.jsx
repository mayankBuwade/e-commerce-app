import { useState } from "react";
import AlertDeleteModal from "../users/AlertDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteSingleProduct } from "../../redux/thunks/productThunks";

const ProductTable = ({ products, setModalProp }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.user.token;
  });

  const [isEditing, setIsEditing] = useState("");
  const [alertDeleteModalProps, setAlertDeleteModalProps] = useState({
    isOpen: false,
    handleYes: handleConfirmDelete,
    id: "",
    title: "product",
  });

  const handleDeleteUser = (id) => {
    setAlertDeleteModalProps({ ...alertDeleteModalProps, isOpen: true, id });
  };

  function handleConfirmDelete(id) {
    dispatch(deleteSingleProduct({ token, id }));
  }

  const handleEditClick = (id) => {
    setIsEditing(id);
  };

  const handleSubmitClick = (id) => {};

  return (
    <div className="w-full items-center overflow-x-auto px-5 md: flex md:justify-center relative">
      <table className="table-auto lg:min-w-full min-w-[800px]">
        <thead className="h-12 bg-yellow-400 text-lg font-semibold uppercase">
          <tr>
            <td className="pl-6 ">Id</td>
            <td>Name</td>
            <td>Price</td>
            <td>Stock</td>
            <td>Manufacturer Name</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="h-10 bg-yellow-50 border-b-2 ">
              <td className="pl-6">{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.manufacturerName}</td>
              <td className="flex justify-around items-center ">
                <button onClick={() => setModalProp({ isOpen: true, product })}>
                  <span className="material-symbols-outlined py-2">
                    visibility
                  </span>
                </button>
                <button>
                  {isEditing === product._id ? (
                    <span
                      className="material-symbols-outlined text-3xl font-semibold"
                      onClick={() => handleSubmitClick(product._id)}
                    >
                      done
                    </span>
                  ) : (
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleEditClick(product._id)}
                    >
                      edit
                    </span>
                  )}
                </button>
                <button onClick={() => handleDeleteUser(product._id)}>
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
export default ProductTable;
