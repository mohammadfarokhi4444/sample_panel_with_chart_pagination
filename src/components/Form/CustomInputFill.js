import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  // height: "100px",
  width: "100% !important",
  margin: "15px 0px",
  "& input": {
    // color: "primary.main",
    // fontSize: 29,
    // fontWeight: 500,
    // height: "50px",
    paddingBottom: "20px",
    // borderRadius: "80px !important",
  },
  "& input::placeholder": {
    [theme.breakpoints.down("md")]: {
      fontSize: "13px",
    },
    fontSize: "18px",
    // paddingBottom: "150px",
  },
  "& .MuiFilledInput-root": {
    backgroundColor: theme.palette.text.main,
    borderRaduis: "5px",
    color: theme.palette.common.black,
  },
  "& .MuiFilledInput-input": {
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px #F3F3F3 inset",
      WebkitTextFillColor: "#134379",
    },
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
}));
const CustomInputFill = ({ name, text, setValue, value }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const configTextField = {
    name,
    value,
    onChange: handleChange,
    fullWidth: true,
    variant: "filled", //outlined
    placeholder: text,
  };
  return (
    <TextFieldCustom
      InputProps={{
        disableUnderline: true,
        sx: {
          height: { md: "45px", xs: "40px" },
          borderRadius: "4px",
        },
      }}
      {...configTextField}
    />
  );
};

export default CustomInputFill;
