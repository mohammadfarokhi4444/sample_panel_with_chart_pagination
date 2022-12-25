import {
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
  Box,
  Button,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import CustomInputFill from "../Form/CustomInputFill";
import { t } from "i18next";
import { useState } from "react";

const EnhancedTableToolbar = ({
  numSelected,
  hancleClick,
  handleFilter,
  handleRemoveFilter,
}) => {
  const [value, setValue] = useState("");

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 && (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={hancleClick}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Box
          display="flex"
          justifyContent={{md:"space-between", xs:"center"}}
          width="100%"
          alignItems="center"
        >
          <FilterListIcon sx={{display:{md:"flex", xs:"none"}}}/>
          <Box display="flex" alignItems="center">
            <CustomInputFill
              name="filter"
              text={t("food.filter")}
              setValue={setValue}
              value={value}
            />
            <Button
              disabled={!value || value == "" ? true : false}
              onClick={() => handleFilter(value)}
              variant="contained"
              sx={{
                height: { md: "45px", xs: "40px" },
                mx: { md: "10px", xs: "5px" },
                backgroundColor: "primary.main",
                color: "common.white",
                "&:hover": {
                  bgcolor: "primary.main",
                },
              }}
            >
              <Typography sx={{ typography: { md: "body1", xs: "body2" } }}>
                {t("food.search")}
              </Typography>
            </Button>
            <Button
              onClick={()=>{
                setValue("")
                handleRemoveFilter()
              }}
              variant="contained"
              sx={{
                height: { md: "45px", xs: "40px" },
                mx: { md: "10px", xs: "5px" },
                backgroundColor: "primary.main",
                color: "common.white",
                "&:hover": {
                  bgcolor: "primary.main",
                },
              }}
            >
              <Typography sx={{ typography: { md: "body1", xs: "body2" } }}>
                {t("food.removeFilter")}
              </Typography>
            </Button>
          </Box>
        </Box>
      )}
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
