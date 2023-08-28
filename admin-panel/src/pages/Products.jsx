import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/thunks/productThunks";
import ProductTable from "../components/products/ProductTable";

const Products = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => {
    return state.user.token;
  });

  let products = useSelector((state) => {
    return state.products.products;
  });

  let isLoading = useSelector((state) => {
    return state.products.loading;
  });

  const [searchQ, setSearchQ] = useState("");
  const [filteredData, setFilteredData] = useState(products);
  const [modalProp, setModalProp] = useState({ isOpen: false, product: {} });

  const handleClick = () => {
    const searchedData = products.filter((product) => {
      for (const key in product) {
        if (
          typeof product[key] === "string" &&
          product[key].search(searchQ) !== -1
        ) {
          return product;
        }
      }
    });
    setFilteredData(searchedData);
  };

  useEffect(() => {
    if (searchQ === "") {
      setFilteredData(products);
    }
  }, [searchQ]);

  useEffect(() => {
    dispatch(getAllProducts(token));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col w-full items-center">
      <div className="my-12 md:w-3/5 w-full px-5 flex justify-center items-center relative">
        <input
          placeholder="search a specific product"
          className="h-10 pl-3 border-2 border-slate-400 rounded min-w-full"
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
        />
        <button className="absolute right-8 top-2 z-0" onClick={handleClick}>
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
      <ProductTable products={filteredData} setModalProp={setModalProp} />
      {/* <Modal modalProp={modalProp} setModalProp={setModalProp} /> */}
    </div>
  );
};
export default Products;
