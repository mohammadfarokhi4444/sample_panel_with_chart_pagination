import {
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";

const TableFooterActions = ({
  total,
  rowsPerPage,
  page,
  setPage,
  FetchData,
  setRowsPerPage,
}) => {
  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    await FetchData(newPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    const limit = parseInt(event.target.value, 10);
    setRowsPerPage(limit);
    setPage(0);
    await FetchData(0, limit);
  };
  return (
    <TableFooter sx={{ direction: "ltr" }}>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableRow>
    </TableFooter>
  );
};

export default TableFooterActions;
