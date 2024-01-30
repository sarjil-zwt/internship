import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminAddProduct.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../redux/features/productSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    CategoryId: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        setCategories(res.data.categories);
        console.log(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = () => {
    console.log(product);
    if (
      product.title == "" ||
      product.description == "" ||
      product.image == "" ||
      product.price == 0 ||
      product.CategoryId == ""
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

  return (
    <div className="addproductpage">
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          margin: 0,
        }}
      >
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
          onChange={(e) =>
            setProduct((product) => ({ ...product, title: e.target.value }))
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
          onChange={(e) =>
            setProduct((product) => ({ ...product, price: e.target.value }))
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
          multiline
          rows={5}
          onChange={(e) =>
            setProduct((product) => ({
              ...product,
              description: e.target.value,
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
          onChange={(e) =>
            setProduct((product) => ({ ...product, image: e.target.value }))
          }
        />

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
            label="Category"
            onChange={(e) =>
              setProduct((product) => ({
                ...product,
                CategoryId: e.target.value,
              }))
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories?.map((c) => {
              return <MenuItem value={c.id}>{c.name}</MenuItem>;
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={(e) => handleSubmit(e)}
        >
          Add Product
        </Button>
      </Container>
    </div>
  );
};

export default AdminAddProduct;
