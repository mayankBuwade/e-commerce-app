import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSingleProduct } from "../redux/thunks/productThunks";

const initialData = {
  name: "",
  price: 0,
  description: "",
  photos: [],
  category: "",
  manufacturerName: "",
  stock: 0,
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  let uploadingData = useSelector((state) => state.products.uploadingData);
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePhotosChange = (event) => {
    const photos = Array.from(event.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      photos: photos,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addSingleProduct({ token, product: formData }));
    setFormData(initialData);
  };

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-3xl mt-8 font-semibold">Add Product</h1>
      <form
        onSubmit={handleSubmit}
        className="p-10 flex flex-col lg:w-[1000px] w-full"
        type="multipart/form"
      >
        <div className="flex flex-col mb-3">
          <label className="text-xl mb-1">Name of the product:</label>
          <input
            type="text"
            name="name"
            className="w-full h-8 border rounded border-black pl-2"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-xl mb-1">Price of the product:</label>
          <input
            type="number"
            name="price"
            className="w-full h-8 border rounded border-black pl-2 pr-2"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step="1"
            required
          />
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-xl mb-1">Description of the product:</label>
          <textarea
            name="description"
            className="w-full h-8 border rounded border-black min-h-[150px] pl-2"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="my-3">
          <label className="text-xl mb-2 mr-2">Product images:</label>
          <input
            type="file"
            name="photos"
            accept="image/*"
            multiple
            onChange={handlePhotosChange}
          />
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-xl mb-1">Category of the product:</label>
          <input
            type="text"
            name="category"
            className="w-full h-8 border rounded border-black pl-2"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-xl mb-1">
            Manufacturer name of the product:
          </label>
          <input
            type="text"
            name="manufacturerName"
            className="w-full h-8 border rounded border-black pl-2"
            value={formData.manufacturerName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-col mb-3">
          <label className="text-xl mb-1">Number of items in stock:</label>
          <input
            type="number"
            name="stock"
            className="w-full h-8 border rounded border-black pl-2 pr-2"
            value={formData.stock}
            onChange={handleInputChange}
            required
            min="0"
            step="1"
          />
        </div>

        <button
          type="submit"
          className="bg-slate-950 text-white p-4 text-2xl font-semibold hover:bg-slate-900 disabled:bg-slate-400"
          disabled={uploadingData}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};
export default AddProduct;
