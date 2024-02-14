import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminAddProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../../redux/features/productSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    vTitle: "",
    fPrice: 0,
    tDescription: "",
    iSubCategoryId: "",
    vImage: "",
  });

  const groupsState = useSelector((state) => state.groupsState);

  const dispatch = useDispatch();
  const [group, setGroup] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [groups, setGroups] = useState(groupsState.groups);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const handleSubmit = () => {
    console.log(product);
    if (
      product.vTitle == "" ||
      product.tDescription == "" ||
      product.vImage == "" ||
      product.fPrice == 0 ||
      product.iSubCategoryId == ""
    ) {
      return toast.error("Please provide all details");
    }
    axios
      .post("/products", product, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(addProduct(res.data));
        toast.success("Product Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const handleGroupChange = (v) => {
    setGroup(v);
    console.log(groups[v - 1]);
    setCategories(groups[v - 1].Categories);
    setSubcategories([]);
  };

  const handleCategoryChange = (v) => {
    setCategory(v);
    const category = categories.find((c) => c.id === v);
    setSubcategories(category.SubCategories);
  };

  const handleAllAddSubmit = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");

    data.map(async (p) => {
      const category = categories.find((c) => {
        return c.name.toLowerCase() === p.category;
      });
      console.log(category);
      await axios
        .post(
          "/products",
          {
            title: p.title,
            description: p.description,
            price: p.price,
            CategoryId: category.id,
            image: p.image,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
          toast.error(err);
        });
    });

    toast.success("All Products Added Successfully");
  };

  return (
    <div className="addproductpage">
      <Typography component="h1" variant="h5">
        Add product
      </Typography>
      <div className="addproductdiv">
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
            label="Category"
            onChange={(e) => handleGroupChange(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {groups?.map((g) => {
              return <MenuItem value={g.id}>{g.vName}</MenuItem>;
            })}
            <MenuItem value="">
              <Link className="missingcategoryoption" to="/admin/group/add">
                Missing Group? Add One
              </Link>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            // value={age}
            sx={{
              width: "100%",
            }}
            className="textfield"
            defaultValue=""
            label="Category"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories?.map((c) => {
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
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">
            Sub Category
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
            label="Category"
            onChange={(e) =>
              setProduct((product) => ({
                ...product,
                iSubCategoryId: e.target.value,
              }))
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {subcategories?.map((sc) => {
              return <MenuItem value={sc.id}>{sc.vName}</MenuItem>;
            })}
            <MenuItem value="">
              <Link
                className="missingcategoryoption"
                to="/admin/categories/add"
              >
                Missing Sucategory? Add One
              </Link>
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          className="textfield"
          sx={{
            mt: 0,
            mb: 0,
          }}
          onChange={(e) =>
            setProduct((product) => ({ ...product, vTitle: e.target.value }))
          }
        />

        <TextField
          margin="normal"
          type="number"
          required
          fullWidth
          id="price"
          label="Price"
          name="price"
          autoComplete="price"
          autoFocus
          className="textfield"
          sx={{
            mt: 0,
            mb: 0,
          }}
          onChange={(e) =>
            setProduct((product) => ({ ...product, fPrice: e.target.value }))
          }
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
          autoFocus
          className="textfield"
          sx={{
            mt: 0,
            mb: 0,
          }}
          multiline
          rows={5}
          onChange={(e) =>
            setProduct((product) => ({
              ...product,
              tDescription: e.target.value,
            }))
          }
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="image"
          label="Image Link"
          name="image"
          autoComplete="image"
          className="textfield"
          sx={{
            mt: 0,
            mb: 0,
          }}
          onChange={(e) =>
            setProduct((product) => ({ ...product, vImage: e.target.value }))
          }
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 0,
            mb: 0,
          }}
          onClick={(e) => handleSubmit(e)}
        >
          Add Product
        </Button>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 0,
            mb: 0,
          }}
          onClick={handleAllAddSubmit}
        >
          Add All Product
        </Button>
      </div>
    </div>
  );
};

export default AdminAddProduct;
