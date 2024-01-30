import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import toast from "react-hot-toast";
import {
  VisibilityOffOutlined,
  VisibilityOutlined,
  Edit,
  Delete,
} from "@mui/icons-material";
import { Hidden, TextField, Typography } from "@mui/material";
import "./AdminAllProducts.css";
import Loader from "../../../../components/loader/Loader";
import ImageModal from "./ImageModal/ImageModal";
import { useDispatch, useSelector } from "react-redux";
import { setProductsState } from "../../../../redux/features/productSlice";

const AdminAllProducts = () => {
  const columns = [
    { id: "id", label: "Id", minWidth: 170 },
    { id: "title", label: "Title", minWidth: 100 },
    { id: "price", label: "Price", minWidth: 100 },
    { id: "description", label: "Description", maxWidth: 200 },
    { id: "imageclm", label: "Image", minWidth: 100 },
    { id: "action", label: "Action", minWidth: 100 },
  ];

  const [products, setProducts] = useState([]);

  const productState = useSelector((state) => state.productState);
  const dispatch = useDispatch();
  // State to track image visibility
  const [viewImage, setViewImage] = useState(false);
  const [currentViewImage, setCurrentViewImage] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/products")
      .then((res) => {
        dispatch(setProductsState(res.data.products));
        setProducts(res.data.products);
      })
      .catch((err) => {
        toast.error(
          err.response.message || "Something went wrong in getting products"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleImageView = (image) => {
    setCurrentViewImage(image);
    setViewImage(true);
  };

  const handleEdit = (productId) => {
    // Handle edit action
    console.log("Edit product with ID:", productId);
  };

  const handleDelete = (productId) => {
    // Handle delete action
    console.log("Delete product with ID:", productId);
  };

  const searchProduct = (e) => {
    e.preventDefault();

    console.log(productState);
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

  return loading ? (
    <Loader />
  ) : (
    <div className="adminallproducts">
      <ImageModal
        open={viewImage}
        setOpen={setViewImage}
        image={currentViewImage}
      />
      <Typography>All Products</Typography>
      <Paper
        sx={{
          width: "80%",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <TextField
          margin="normal"
          sx={{
            width: 400,
          }}
          label="search"
          onChange={(e) => searchProduct(e)}
        />
        {products.length > 0 ? (
          <TableContainer sx={{ height: "70vh" }} className="aaptablecontainer">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1}>
                        <TableCell
                          sx={{
                            maxWidth: 100,
                            overflow: "hidden",
                          }}
                        >
                          {product.id}
                        </TableCell>
                        <TableCell sx={{ maxWidth: 500 }}>
                          <p className="aapttitle">{product.title}</p>
                        </TableCell>
                        <TableCell
                          sx={{
                            maxWidth: 200,
                            overflow: "hidden",
                          }}
                        >
                          {product.price}
                        </TableCell>
                        <TableCell sx={{ maxWidth: 700 }}>
                          <p className="description">{product.description}</p>
                        </TableCell>
                        <TableCell
                          sx={{
                            overflow: "hidden",
                          }}
                        >
                          <VisibilityOutlined
                            onClick={() => handleImageView(product.image)}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            overflow: "hidden",
                          }}
                        >
                          <div className="aapactionbtns">
                            <Edit
                              sx={{
                                color: "#1976d2",
                                transition: "0.2s all",
                                "&: hover": {
                                  color: "#3c52b2",
                                },
                                cursor: "pointer",
                              }}
                            />
                            <Delete
                              sx={{
                                color: "#ff5e5e",
                                transition: "0.2s all",
                                "&: hover": {
                                  color: "#e35454",
                                },
                                cursor: "pointer",
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="aapnoproductfounddiv">
            <p>No Products Found</p>
          </div>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default AdminAllProducts;
