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
import "./AllGroup.css";
import Loader from "../../../../components/loader/Loader";
import CustomNotFound from "../../../../components/CustomNotFound/CustomNotFound";
// import EditgroupModal from "./EditCategoryModal/EditCategoryModal";

const AllGroup = () => {
  const [groups, setGroups] = useState([]);
  const [initialGroups, setInitialGroups] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const [currentGroup, setCurrentGroup] = useState({});
  const [editModal, setEditModal] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/groups")
      .then((res) => {
        setGroups(res.data.groups);
        setInitialGroups(res.data.groups);
      })
      .catch((err) => {
        toast.error(
          err.response.message || "Something went wrong in getting groups"
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

  const handleEdit = (group) => {
    setCurrentGroup({ ...group });
    setEditModal(true);
  };
  const handleDelete = async (id) => {
    setDeletingId(id);
    await axios
      .delete(`/groups/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setGroups(res.data.groups);
        setInitialGroups(res.data.groups);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setDeletingId(null);
      });
  };

  const searchProduct = (e) => {
    e.preventDefault();

    const filteredResults = initialGroups.filter((item) => {
      const { name } = item;
      const lowercaseSearch = e.target.value;
      return name.toLowerCase().includes(lowercaseSearch);
    });
    setGroups(filteredResults);
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
            All Groups
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
              {groups.length > 0 ? (
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {groups
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((group) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1}>
                            <TableCell
                              sx={{
                                maxWidth: 100,
                                overflow: "hidden",
                              }}
                            >
                              {group.id}
                            </TableCell>
                            <TableCell sx={{ maxWidth: 500 }}>
                              <p className="aacttitle">{group.vName}</p>
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
                                  onClick={() => handleEdit({ ...group })}
                                />
                                {deletingId == group.id ? (
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
                                    onClick={() => handleDelete(group.id)}
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
                <CustomNotFound message={"No groups Found"} />
              )}
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={groups.length}
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

export default AllGroup;
