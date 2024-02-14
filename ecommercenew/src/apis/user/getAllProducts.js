import axios from "axios"; // Adjust the import path as needed
import { setProductsState } from "../../redux/features/productSlice";

const getAllProducts = async (
  url,
  products,
  setProducts,
  setCompletedProducts,
  dispatch,
  setLoading,
  setLoadingMore
) => {
  try {
    const res = await axios.get(url);
    const newProducts = [...products, ...res.data.products];
    dispatch(setProductsState(newProducts));
    setProducts(newProducts); // Dispatch action to update products state in Redux
    if (res.data.products.length < 20) {
      setCompletedProducts(true);
    }

    setLoading(false);
    setLoadingMore(false);
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
};

export default getAllProducts;
