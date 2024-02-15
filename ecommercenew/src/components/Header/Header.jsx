import React, { useEffect, useState } from "react";
import "./Header.css";
import {
  FavoriteBorderOutlined,
  LocalMallOutlined,
  LogoDev,
  PersonOutline,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import assets from "../../assets";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "@mui/material";
import Searchbar from "./SearchBar/Searchbar";
import ProfileAccountMenu from "./ProfileAccountMenu/ProfileAccountMenu";

const Header = () => {
  const [content, setContent] = useState([]);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const cartState = useSelector((state) => state.cartState);

  const data = useSelector((state) => state.groupsState);
  const userState = useSelector((state) => state.userState);

  const handleMouseOver = (category) => {
    setContent(data.groups[category]);
    setCategoriesOpen(true);
  };

  const handleMouseLeave = () => {
    setContent("");
    setCategoriesOpen(false);
  };

  const location = useLocation();

  useEffect(() => {
    setCategoriesOpen(false);
  }, [location.pathname]);

  console.log(userState?.userState?.vImage);
  const image = userState?.userState?.vImage;
  return (
    <header className="header">
      <div className="headerleft">
        <Link to="/">
          <img src={assets.images.logo} alt="" className="headerlogo" />
        </Link>
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

          <div
            className={`floatingDivwrapper  ${categoriesOpen ? "open" : ""}`}
          >
            <div
              className={`floatingcategorieslistdiv  ${
                categoriesOpen ? "open" : ""
              } `}
              onMouseLeave={handleMouseLeave}
            >
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
        </div>
      </div>
      <div className="headerright">
        <Searchbar />
        <div className="headerrightlogoitemswrapper">
          {userState.isLoggedIn ? (
            <ProfileAccountMenu />
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/" className="headerlogoitem">
            <FavoriteBorderOutlined className="headerlogoitemlogo" />
            <p className="headerlogoitemtxt">Wishlist</p>
          </Link>
          {userState.isLoggedIn ? (
            <Link to="/profile/cart" className="headerlogoitem">
              <Badge
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                badgeContent={cartState?.cart?.CartItems?.length}
                overlap="circular"
                color="primary"
              >
                <LocalMallOutlined className="headerlogoitemlogo" />
              </Badge>
              <p className="headerlogoitemtxt">Cart</p>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
