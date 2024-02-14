import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import {
  FavoriteBorderOutlined,
  LocalMallOutlined,
  Person,
  PersonOutline,
  SearchOffOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import assets from "../../assets";
import axios from "axios";
import { useSelector } from "react-redux";

const Header = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const [content, setContent] = useState([]);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchComponent, setSearchComponent] = useState(false);
  const [searchData, setSearchData] = useState({});

  const data = useSelector((state) => state.groupsState);

  const handleMouseOver = (category) => {
    setContent(data.groups[category]);
    setCategoriesOpen(true);
  };

  const handleMouseLeave = () => {
    setContent("");
    setCategoriesOpen(false);
  };

  const handleSearchInputChange = async (e) => {
    if (e.target.value.length >= 3) {
      setSearchComponent(true);

      await axios
        .get(`/search/header?query=${e.target.value}`)
        .then((res) => {
          console.log(res.data);
          setSearchData(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setSearchComponent(false);
    }
  };

  return (
    <header className="header">
      <div className="headerleft">
        <img src={assets.images.logo} alt="" className="headerlogo" />
        <div
          className="headersupercategorieslist"
          onMouseLeave={handleMouseLeave}
        >
          <Link to={`/group/men`} onMouseOver={() => handleMouseOver(0)}>
            Men
          </Link>
          <Link to={`/group/women`} onMouseOver={() => handleMouseOver(1)}>
            Women
          </Link>
          <Link to={`/group/kids`} onMouseOver={() => handleMouseOver(2)}>
            Kids
          </Link>
          <Link
            to={`/group/homeandliving`}
            onMouseOver={() => handleMouseOver(3)}
          >
            Home & living
          </Link>
          <Link to={`/group/beauty`} onMouseOver={() => handleMouseOver(4)}>
            Beauty
          </Link>

          {content && (
            <div
              className={`floatingDivwrapper  ${
                categoriesOpen ? "open" : "hidden"
              }`}
            >
              <div className="floatingcategorieslistdiv">
                <div className="floatingcategorieslistdivinnner">
                  {content?.Categories?.map((c) => {
                    return (
                      <div className="contentcategorydiv">
                        <Link
                          to={`/products?category=${c.id}`}
                          className="contentcategory"
                        >
                          {c.vName}
                        </Link>
                        {c.SubCategories.map((sc) => {
                          return (
                            <Link
                              to={`/products?category=${c.id}&subcategory=${sc.id}`}
                              className="contentsubcategory"
                            >
                              {sc.vName}
                            </Link>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="headerright">
        <div
          className={`headerrightsearchinputwrapper ${
            inputFocused === true ? "focused" : ""
          }`}
        >
          <SearchOutlined />
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="headerrightsearchinput"
            onFocus={() => setInputFocused(true)}
            onBlur={() => {
              setInputFocused(false);
              setSearchComponent(false);
            }}
            onChange={(e) => handleSearchInputChange(e)}
          />

          <div
            className={
              searchComponent ? "searchcomponentopen" : "searchcomponentclose"
            }
          >
            {searchData &&
              searchData?.subcategories?.map((sc) => {
                return (
                  <Link
                    to={`/products?category=${sc.iCategoryId}&subcategory=${sc.id}`}
                  >
                    {sc.vName}
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="headerrightlogoitemswrapper">
          <Link to="/profile" className="headerlogoitem">
            <PersonOutline className="headerlogoitemlogo" />
            <p className="headerlogoitemtxt">Profile</p>
          </Link>
          <Link to="/" className="headerlogoitem">
            <FavoriteBorderOutlined className="headerlogoitemlogo" />
            <p className="headerlogoitemtxt">Wishlist</p>
          </Link>
          <Link to="/cart" className="headerlogoitem">
            <LocalMallOutlined className="headerlogoitemlogo" />
            <p className="headerlogoitemtxt">Cart</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
