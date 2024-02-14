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
import { Edit, Delete } from "@mui/icons-material";
import { TextField, Typography } from "@mui/material";
import "./AllCategories.css";
import Loader from "../../../../components/loader/Loader";
import CustomNotFound from "../../../../components/CustomNotFound/CustomNotFound";
import EditCategoryModal from "./EditCategoryModal/EditCategoryModal";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [initialCategories, setInitialCategories] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const [currentCategory, setCurrentCategory] = useState({});
  const [editModal, setEditModal] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/categories")
      .then((res) => {
        console.log(res.data.categories);
        setCategories(res.data.categories);
        setInitialCategories(res.data.categories);
      })
      .catch((err) => {
        toast.error(
          err.response.message || "Something went wrong in getting categories"
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

  const handleEdit = (category) => {
    setCurrentCategory({ ...category });
    setEditModal(true);
  };
  const handleDeleteCategory = async (id) => {
    setDeletingId(id);
    await axios
      .delete(`/categories/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setCategories(res.data.categories);
        setInitialCategories(res.data.categories);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setDeletingId(null);
      });
  };

  const searchProduct = (e) => {
    e.preventDefault();

    const filteredResults = initialCategories.filter((item) => {
      const { name } = item;
      const lowercaseSearch = e.target.value;
      return name.toLowerCase().includes(lowercaseSearch);
    });
    setCategories(filteredResults);
  };
  return (
    <div className="adminallcategories">
      <EditCategoryModal
        open={editModal}
        setOpen={setEditModal}
        c={{ ...currentCategory }}
        setCategories={setCategories}
      />
      {/* <ImageModal
        open={viewImage}
        setOpen={setViewImage}
        image={currentViewImage}
      /> */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Typography component="h1" variant="h5">
            All Categories
          </Typography>
          <Paper
            sx={{
              width: "60%",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
              paddingInline: 4,
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
              className="aactablecontainer"
            >
              {categories.length > 0 ? (
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Group</TableCell>

                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {categories &&
                      categories
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((category) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1}>
                              <TableCell
                                sx={{
                                  maxWidth: 100,
                                  overflow: "hidden",
                                }}
                              >
                                {category.id}
                              </TableCell>
                              <TableCell sx={{ maxWidth: 500 }}>
                                <p className="aacttitle">{category.vName}</p>
                              </TableCell>
                              <TableCell sx={{ maxWidth: 500 }}>
                                <p className="aacttitle">
                                  {category.Group.vName}
                                </p>
                              </TableCell>
                              <TableCell
                                sx={{
                                  overflow: "hidden",
                                }}
                              >
                                <div className="aacactionbtns">
                                  <Edit
                                    sx={{
                                      color: "#1976d2",
                                      transition: "0.2s all",
                                      "&: hover": {
                                        color: "#3c52b2",
                                      },
                                      cursor: "pointer",
                                    }}
                                    onClick={() => handleEdit({ ...category })}
                                  />
                                  {deletingId == category.id ? (
                                    <Loader />
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
                                        handleDeleteCategory(category.id)
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
                <CustomNotFound message={"No categoriess Found"} />
              )}
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={categories.length}
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

export default AllCategories;
