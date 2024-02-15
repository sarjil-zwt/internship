import { SearchOutlined } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const [searchComponent, setSearchComponent] = useState(false);
  const [searchData, setSearchData] = useState({});
  const searchComponentRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const debouncedValue = useDebounce(searchValue, 500);

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchValue.length > 3) {
        navigate(`/products?search=${searchValue}`);
      }
    }
  };

  useEffect(() => {
    if (debouncedValue.length > 1) {
      axios
        .get(`/search/header?query=${debouncedValue}`)
        .then((res) => {
          console.log(res.data);
          setSearchData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [debouncedValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchComponentRef.current &&
        !searchComponentRef.current.contains(event.target)
      ) {
        setSearchComponent(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={searchComponentRef}
      className={`headerrightsearchinputwrapper ${
        inputFocused === true ? "focused" : ""
      }`}
    >
      <SearchOutlined />
      <input
        type="text"
        placeholder="Search for products, brands and more"
        className="headerrightsearchinput"
        onFocus={() => {
          setSearchComponent(true);
          setInputFocused(true);
        }}
        onBlur={() => {
          setInputFocused(false);
          console.log("clicked");
        }}
        onKeyDown={handleInputKeyDown}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div
        className={
          searchComponent ? "searchcomponentopen" : "searchcomponentclose"
        }
        onBlur={() => {
          setSearchComponent(false);
        }}
      >
        <div className="searchcomponentdatawrapper">
          {searchData &&
            searchData?.subcategories?.map((sc) => {
              return (
                <Link
                  className="searchsubcategorylink"
                  to={`/products?category=${sc.iCategoryId}&subcategory=${sc.id}`}
                >
                  {sc.vName} ({sc.Category.Group.vName})
                </Link>
              );
            })}

          {searchData &&
            searchData?.products?.map((p) => {
              return (
                <Link to={`/product/${p.id}`} className="searchproductlink">
                  <div className="spcimgwrapper">
                    <img src={p.vImage} alt="" />
                  </div>
                  <p>{p.vTitle}</p>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
