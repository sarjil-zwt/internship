import React, { useEffect, useState } from "react";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import axios from "axios";
import "./AllProducts.css";
import Loader from "../../../../components/loader/Loader";
import { useDispatch } from "react-redux";
import { setProductsState } from "../../../../redux/features/productSlice";
import CustomNotFound from "../../../../components/CustomNotFound/CustomNotFound";
import { useSearchParams } from "react-router-dom";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const [pageNo, setPageNo] = useState(1);

  const [completedProducts, setCompletedProducts] = useState(false);

  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    pageNo === 1 && setLoading(true);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pageNo]);

  useEffect(() => {
    setPageNo(1);
    setProducts([]);
    setCompletedProducts(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="allproductswrapper">
      {loading && <Loader />}

      <div className="allproductsproductswrapper">
        {products.length > 0 ? (
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
          !loading && <CustomNotFound message={"No Product Found"} />
        )}
      </div>
    </div>
  );
};

export default AllProducts;
