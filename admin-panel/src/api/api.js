import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/v1", // Set your API base URL
  timeout: 5000, // Set a timeout
});

const api = {
  loginUser: async (email, password) => {
    const response = await instance.post("/login", {
      email,
      password,
    });
    return response;
  },
  getAllProducts: async (token) => {
    const response = await instance.get("/admin/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  deleteSingleProduct: async (token, productId) => {
    const response = await instance.delete(`/admin/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  addSingleProduct: async (token, product) => {
    const formData = new FormData();
    for (const key in product) {
      if (key === "photos") {
        for (const photo of product[key]) {
          formData.append("photos", photo);
        }
      } else {
        formData.append(key, product[key]);
      }
    }
    const response = await instance.post(`/admin/product/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
};

export default api;
