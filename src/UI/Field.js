import React from "react";
import { TextField, withStyles } from "@material-ui/core";

const StyledField = withStyles((theme) => ({
  root: {
    margin: "0px",

    //input
    "& input": {
      color: "#fff",
    },

    //placeholder
    "& label": {
      //default
      color: "#bbb",
    },

    //border
    "& .MuiOutlinedInput-root": {
      //default
      "& fieldset": {
        borderColor: "#ddd",
      },
      //hover
      "&:hover": {
        borderColor: "#fff",
      },
    },
  },
}))(TextField);

const Field = ({ password, admin, long, errorText, children, ...rest }) => (
  <StyledField
    label={children}
    variant="outlined"
    margin="dense"
    required
    fullWidth
    autoComplete="off"
    spellCheck="false"
    //Admin/User color
    color={admin ? "secondary" : "primary"}
    //Password
    type={password ? "password" : undefined}
    //Error Text
    error={!!errorText}
    helperText={errorText}
    //Long Inputs
    multiline={long}
    inputProps={{
      maxLength: long ? null : "45",
    }}
    InputProps={{
      style: { minHeight: long ? "200px" : null, alignItems: "flex-start" },
    }}
    InputLabelProps={{ required: false }}
    {...rest}
  />
);

export default Field;
