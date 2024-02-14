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
  ErrorOutline,
} from "@mui/icons-material";
import { Hidden, TextField, Typography } from "@mui/material";
import "./AdminAllProducts.css";
import Loader from "../../../../components/loader/Loader";
import ImageModal from "./ImageModal/ImageModal";
import { useDispatch, useSelector } from "react-redux";
import { setProductsState } from "../../../../redux/features/productSlice";
import assets from "../../../../assets/index";
import CustomNotFound from "../../../../components/CustomNotFound/CustomNotFound";
import EditProductModal from "./EditProductModal/EditProductModal";

const AdminAllProducts = () => {
  const [products, setProducts] = useState([]);

  const productState = useSelector((state) => state.productState);

  const dispatch = useDispatch();
  // State to track image visibility
  const [viewImage, setViewImage] = useState(false);
  const [currentViewImage, setCurrentViewImage] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({});
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function loadproducts() {
      await axios
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
    }
    loadproducts();
  }, []);

  // console.log(products);

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

  const handleEdit = (product) => {
    setCurrentProduct({ ...product });
    setEditModal(true);
    // console.log(currentProduct, ":::::::::::::::");
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

  const handleDeleteProduct = async (id) => {
    setDeletingId(id);
    await axios
      .delete(`/products/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setProducts(res.data.products);
        dispatch(setProductsState(res.data.products));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setDeletingId(null);
      });
  };

  return (
    <div className="adminallproducts">
      {loading ? (
        <Loader size="3rem" />
      ) : (
        <>
          <ImageModal
            open={viewImage}
            setOpen={setViewImage}
            image={currentViewImage}
          />
          <EditProductModal
            open={editModal}
            setOpen={setEditModal}
            p={{ ...currentProduct }}
            setProducts={setProducts}
          />
          <Typography component="h1" variant="h5">
            All Products
          </Typography>
          <Paper
            sx={{
              width: "80%",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
              height: "80%",
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
            <TableContainer
              sx={{ height: "70vh" }}
              className="aaptablecontainer"
            >
              {products.length > 0 ? (
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  sx={{ borderBottom: "none" }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ textAlign: "center" }}>Id</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>Title</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        Description
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        Category
                      </TableCell>

                      <TableCell sx={{ textAlign: "center" }}>Image</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {products
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((product) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={product.id}
                          >
                            <TableCell sx={{ textAlign: "center" }}>
                              {product.id}
                            </TableCell>
                            <TableCell
                              sx={{ maxWidth: 400, textAlign: "justify" }}
                            >
                              <p className="aapttitle">{product.title}</p>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {product.price}
                            </TableCell>
                            <TableCell
                              sx={{ maxWidth: 400, textAlign: "justify" }}
                            >
                              <p className="description">
                                {product.description}
                              </p>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {product.Category?.name || "-"}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              <VisibilityOutlined
                                sx={{
                                  cursor: "pointer",
                                }}
                                onClick={() => handleImageView(product.image)}
                              />
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
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
                                  onClick={() => handleEdit({ ...product })}
                                />
                                {deletingId == product.id ? (
                                  <Loader size="1rem" />
                                ) : (
                                  <Delete
                                    sx={{
                                      color: "#ff5e5e",
                                      transition: "0.2s all",
                                      "&: hover": {
                                        color: "#e35454",
                                      },
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      handleDeleteProduct(product.id)
                                    }
                                  />
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              ) : (
                <CustomNotFound message={"No products Found"} />
              )}
            </TableContainer>
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
        </>
      )}
    </div>
  );
};
export default AdminAllProducts;
