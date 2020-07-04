import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";

const StyledField = withStyles((theme) => ({
  root: {
    margin: "0px",
    width: "100%",

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

    "& .MuiMenuItem-root": {
      width: "100%",
    },
  },
}))(TextField);

const SelectField = ({
  password,
  admin,
  long,
  errorText,
  children,
  object,
  id,
  ...rest
}) => {
  return (
    <StyledField
      id={id}
      name={id}
      variant="outlined"
      margin="dense"
      required
      select
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
    >
      {object &&
        Object.keys(object).map((key) => (
          <MenuItem value={object[key].name} key={object[key].key}>
            {object[key].name}
          </MenuItem>
        ))}
    </StyledField>
  );
};

export default SelectField;
