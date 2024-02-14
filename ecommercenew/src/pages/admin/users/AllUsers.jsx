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
import "./AllUsers.css";
// import Loader from "../../../../components/loader/Loader";
// import CustomNotFound from "../../../../components/CustomNotFound/CustomNotFound";
import Loader from "../../../components/loader/Loader";
import CustomNotFound from "../../../components/CustomNotFound/CustomNotFound";
// import EditCategoryModal from "./EditCategoryModal/EditCategoryModal";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [initialUsers, setInitialUsers] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [editModal, setEditModal] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/user")
      .then((res) => {
        console.log(users);
        setUsers(res.data.users);
        setInitialUsers(res.data.users);
      })
      .catch((err) => {
        toast.error(
          err.response.message || "Something went wrong in getting users"
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

  const handleEdit = (user) => {
    setCurrentUser({ ...user });
    setEditModal(true);
  };
  const handleDeleteUser = async (id) => {
    setDeletingId(id);
    await axios
      .delete(`/user/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setUsers(res.data.categories);
        setInitialUsers(res.data.categories);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setDeletingId(null);
      });
  };

  const searchProduct = (e) => {
    e.preventDefault();

    const filteredResults = initialUsers.filter((item) => {
      const { name, email } = item;
      const lowercaseSearch = e.target.value;
      return (
        name.toLowerCase().includes(lowercaseSearch) ||
        email.toLowerCase().includes(lowercaseSearch)
      );
    });
    setUsers(filteredResults);
  };
  return (
    <div className="adminallcategories">
      {/* <EditCategoryModal
        open={editModal}
        setOpen={setEditModal}
        c={{ ...currentCategory }}
        setCategories={setCategories}
      /> */}
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
            All Users
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
              {users.length > 0 ? (
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Password</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1}>
                            <TableCell
                              sx={{
                                maxWidth: 100,
                                overflow: "hidden",
                              }}
                            >
                              {user.id}
                            </TableCell>
                            <TableCell>
                              <p>{user.name}</p>
                            </TableCell>

                            <TableCell>
                              <p>{user.email}</p>
                            </TableCell>
                            <TableCell>
                              <p>{user.password}</p>
                            </TableCell>
                            <TableCell>
                              <p>{user.role}</p>
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
                                  onClick={() => handleEdit({ ...user })}
                                />
                                {deletingId == user.id ? (
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
                                    onClick={() => handleDeleteUser(user.id)}
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
                <CustomNotFound message={"No User Found"} />
              )}
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={users.length}
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

export default AllUser;
