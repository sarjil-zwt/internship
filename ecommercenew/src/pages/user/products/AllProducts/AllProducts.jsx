import React, { useEffect, useState } from "react";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import axios from "axios";
import "./AllProducts.css";
import Loader from "../../../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setProductsState } from "../../../../redux/features/productSlice";
import { Pagination, TextField } from "@mui/material";
import { TablePagination } from "@mui/base";
import CustomNotFound from "../../../../components/CustomNotFound/CustomNotFound";
import { useParams, useSearchParams } from "react-router-dom";
import useQuery from "../../../../hooks/useQuery";
import Lottie from "lottie-react";
import bird from "../../../../components/loader/bird.json";

const AllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const productState = useSelector((state) => state.productState);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNo, setPageNo] = useState(1);

  const [completedProducts, setCompletedProducts] = useState(false);

  const [loadingMore, setLoadingMore] = useState(false);
  useEffect(() => {
    pageNo == 1 && setLoading(true);
    const subcategory = searchParams.get("subcategory");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const url =
      `/products?page=${pageNo}` +
      (subcategory ? `&subcategory=${subcategory}` : "") +
      (category ? `&category=${category}` : "") +
      (search ? `&search=${search}` : "") +
      `&pageNo=${pageNo}` +
      `&limit=${20}`;
    axios
      .get(url)
      .then((res) => {
        setProducts((products) => [...products, ...res.data.products]);
        if (res.data.products.length < 20) {
          setCompletedProducts(true);
        }
        dispatch(setProductsState([...products, ...res.data.products]));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });

    console.log(searchParams.get("subcategory"), "sub cat");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pageNo]);

  useEffect(() => {
    setPageNo(1);
    setProducts([]);
    setCompletedProducts(false);
  }, [searchParams]);

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

  return (
    <div className="allproductswrapper">
      {loading && <Loader />}

      <div className="allproductsproductswrapper">
        {products.length >= 1 ? (
          <div>
            <div className="allproducts">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="allproductsloadbuttons">
              {!completedProducts &&
                (loadingMore ? (
                  <Loader position="unset" />
                ) : (
                  <button
                    type="button"
                    className=""
                    disabled={loadingMore} // Disable button while loading
                    onClick={(e) => {
                      e.preventDefault();
                      setLoadingMore(true); // Set loading state for "Load More" button
                      setPageNo((p) => p + 1);
                    }}
                  >
                    LoadMore
                  </button>
                ))}
            </div>
          </div>
        ) : (
          <CustomNotFound message={"No Product Found"} />
        )}
      </div>
    </div>
  );
};

export default AllProducts;
