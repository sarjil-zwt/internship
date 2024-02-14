import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../../redux/features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import toast from "react-hot-toast";
import "./AddSubCategory.css";

const AddSubCategory = () => {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/groups")
      .then((res) => {
        setGroups(res.data.groups);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post(
        `/subcategories`,
        { vName: name, iCategoryId: category },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data.message ||
            "Something went wrong please try again later!!"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGroupChange = (v) => {
    setGroup(v);
    setCategories(groups[v - 1].Categories ? groups[v - 1].Categories : []);
  };

  return (
    <div className="addsubcategory">
      {loading && <Loader />}
      <Typography component="h1" variant="h5">
        Add Subcategory
      </Typography>
      <div className="subcategoryinputswrapper">
        <CssBaseline />
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Group
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            // value={age}
            sx={{
              width: "100%",
            }}
            className="textfield"
            defaultValue=""
            label="Select Group"
            onChange={(e) => handleGroupChange(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {groups &&
              groups?.map((g) => {
                return <MenuItem value={g.id}>{g.vName}</MenuItem>;
              })}
            <MenuItem value="">
              <Link
                className="missingcategoryoption"
                to="/admin/categories/add"
              >
                Missing Category? Add One
              </Link>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            // value={age}

            className="textfield"
            defaultValue=""
            label="Select Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories &&
              categories?.map((c) => {
                return <MenuItem value={c.id}>{c.vName}</MenuItem>;
              })}
            <MenuItem value="">
              <Link
                className="missingcategoryoption"
                to="/admin/categories/add"
              >
                Missing Category? Add One
              </Link>
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="subcategory"
          label="Subcategory"
          name="subcategory"
          autoComplete="subcategory"
          autoFocus
          sx={{
            width: "100%",
            mt: 0,
            mb: 0,
            marginTop: 0,
            marginBottom: 0,
          }}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={(e) => handleSubmit(e)}
        >
          Add Category
        </Button>
        <Link to="/admin/categories/all">
          <Typography component="p" align="right" color="primary">
            See all categories
          </Typography>
        </Link>
      </div>
    </div>
  );
};

export default AddSubCategory;
