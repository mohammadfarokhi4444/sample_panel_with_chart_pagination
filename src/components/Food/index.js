import { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow, Checkbox } from "@mui/material";
import { useTranslation } from "react-i18next";
import { signOut, useUserDispatch } from "../../context/UserContext";
import FetchApi from "../../services/FetchApi";
import { useNavigate } from "react-router-dom";
import TableFooterActions from "../Table/TableFooterActions";
import TableFrame from "../Table/TableFrame";
import PageTitle from "../Utils/PageTitle";
import CustomSnackbar from "../Form/CustomSnackbar";
import CustomDialog from "../Form/CustomDialog";
import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

const Food = () => {
  const navigate = useNavigate();
  const disPatch = useUserDispatch();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackData, setSnackData] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState("");

  const token = localStorage.getItem("token");

  const FetchData = async (newPage = 0, limit = rowsPerPage, newFilter) => {
    setLoading(true);
    const res = await FetchApi(
      token,
      language,
      "listFoods",
      {},
      `?page=${newPage + 1}&limit=${limit}${
        newFilter || newFilter == "" ? newFilter : filter
      }`
    );
    if (res.success) {
      setTotal(res.dataBody.count);
      setRows(res.dataBody.list);
    } else {
      if (res.status == 401 || res.status == 403) signOut(disPatch, navigate);
    }
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      await FetchData();
    }
    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleFilter = async (value) => {
    value = `&filter[where][dessert]=${value}`;
    setFilter(value);
    setPage(0);
    await FetchData(0, rowsPerPage, value);
  };
  const handleRemoveFilter = async () => {
    if (filter && filter != "") {
      setFilter("");
      setPage(0);
      await FetchData(0, rowsPerPage, "");
    }
  };
  const handleOpenDelete = () => {
    if (selected.length > 0) setShowDialog(true);
  };
  const handleDelete = async () => {
    setShowDialog(false);
    const res = await FetchApi(token, language, "deleteFoods", {
      ids: selected,
    });
    if (res.success) {
      await FetchData(page);
    } else {
      if (res.status == 401 || res.status == 403) signOut(disPatch, navigate);
    }
    setSnackData({
      title: t(`all.${res.success ? "success" : "error"}`),
      type: res.success ? "success" : "error",
      des: res.message,
    });
    setOpenSnackbar(true);
  };
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  return (
    <>
      <CustomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        snackData={snackData}
      />
      <CustomDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        text={t("all.delete")}
        warningText={t("all.recovery")}
        handleSubmitDialog={handleDelete}
      />
      <PageTitle title={t("food.title")} />
      <EnhancedTableToolbar
        numSelected={selected.length}
        hancleClick={handleOpenDelete}
        handleFilter={handleFilter}
        handleRemoveFilter={handleRemoveFilter}
      />
      <TableFrame
        loading={loading}
        notFoundText={t("food.notFound")}
        firstItem={!!rows[0]}
      >
        <EnhancedTableHead
          t={t}
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, row.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </TableCell>
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="none"
                  align="center"
                >
                  {row.dessert}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>

                <TableCell align="center">
                  <Checkbox disabled checked={!!row.protein} />
                </TableCell>
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooterActions
          total={total}
          rowsPerPage={rowsPerPage}
          page={page}
          setPage={setPage}
          FetchData={FetchData}
          setRowsPerPage={setRowsPerPage}
        />
      </TableFrame>
    </>
  );
};

export default Food;
