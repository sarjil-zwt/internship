import React, { useEffect, useState } from "react";
import "./EditProductModal.css";
import Modal from "@mui/material/Modal";
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
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setProductsState } from "../../../../../redux/features/productSlice";
import Loader from "../../../../../components/loader/Loader";

const EditProductModal = ({ open, setOpen, p, setProducts }) => {
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    CategoryId: "",
    image: "",
  });
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/categories")
      .then((res) => {
        setCategories(res.data.categories);
        setProduct({
          title: p.title,
          price: p.price,
          description: p.description,
          CategoryId: p.CategoryId,
          image: p.image,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [p]);
  //   console.log(product, "Editmodal product");
  // useEffect(() => {

  //   // console.log(product, "product");
  // }, [p]);

  const handleSubmit = async () => {
    await axios
      .put(`/products/${p.id}`, product)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        updateProducts(res.data.product);
      })
      .catch((err) => {
        toast.error(err.response.message || "Something went wrong");
        console.log(err);
      });
    // console.log(res.);

    handleClose();
  };

  const updateProducts = (pd) => {
    console.log(pd);
    setProducts((prevProducts) => {
      return prevProducts.map((p) => (p.id === pd.id ? pd : p));
    });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          border: "1px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="editmodaldiv">
          {loading ? (
            <Loader size="2rem" />
          ) : (
            <>
              <Typography component="h1" variant="h5">
                Edit product
              </Typography>
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
                    setProduct((product) => ({
                      ...product,
                      title: e.target.value,
                    }))
                  }
                  value={product.title}
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
                    setProduct((product) => ({
                      ...product,
                      price: e.target.value,
                    }))
                  }
                  value={product.price}
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
                  value={product.description}
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
                    setProduct((product) => ({
                      ...product,
                      image: e.target.value,
                    }))
                  }
                  value={product.image}
                />

                {!loading && (
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Category
                    </InputLabel>
                    <Select
                      value={product.CategoryId}
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      sx={{
                        width: "100%",
                      }}
                      defaultValue=""
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
                        return (
                          <MenuItem value={c.id} key={c.id}>
                            {c.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => handleSubmit()}
                >
                  Edit Product
                </Button>
              </Container>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EditProductModal;
