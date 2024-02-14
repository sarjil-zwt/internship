import React, { useState } from "react";
import "./ReviewCard.css";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Rating,
} from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";

const ReviewCard = ({ review }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="reviewcard">
      <div className="reviewcardheader">
        <div className="rchprofile">
          <Avatar />
          <p>{review.User.vName}</p>
        </div>
        <div className="reviewcardmenu">
          <IconButton
            id="basic-button"
            sx={{
              color: "black",
              ":& hover": {
                backgroundColor: "gray",
              },
            }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Edit /> Edit
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Delete /> Delete
            </MenuItem>
          </Menu>
        </div>
      </div>
      <div className="reviewcardbody">
        <div className="rcbratingdisplay">
          <Rating
            name="reviewcard-rating"
            readOnly
            defaultValue={review.fRating}
          />
          <p className="">{review.fRating}/5</p>
          {review.tagline && (
            <p className="rcbratingdisplaytagline">- {review.vTagline}</p>
          )}
        </div>
        <p>{review.vReview}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
