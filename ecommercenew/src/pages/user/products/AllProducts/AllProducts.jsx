import React, { useEffect, useState } from "react";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import axios from "axios";
import "./AllProducts.css";
import Loader from "../../../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setProductsState } from "../../../../redux/features/productSlice";
import { TextField } from "@mui/material";

const AllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const productState = useSelector((state) => state.productState);
  const dispatch = useDispatch();

  const loadproducts = () => {
    setLoading(true);
    axios
      .get("/products")
      .then((res) => {
        console.log(res.data);
        dispatch(setProductsState(res.data.products));
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadproducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchProduct = (e) => {
    e.preventDefault();

    const filteredResults = productState.products.filter((item) => {
      const { title, description, Category } = item;
      const lowercaseSearch = e.target.value;
      return (
        title.toLowerCase().includes(lowercaseSearch) ||
        description.toLowerCase().includes(lowercaseSearch) ||
        Category?.name.toLowerCase().includes(lowercaseSearch)
      );
    });
    setProducts(filteredResults);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="allproductswrapper">
      <div className="allproductssearchbar">
        <TextField
          margin="normal"
          sx={{
            width: 400,
          }}
          label="search"
          onChange={(e) => searchProduct(e)}
        />
      </div>
      <div className="allproducts">
        {products.length >= 1 ? (
          products.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <div className="products_npf">No Products Found</div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
