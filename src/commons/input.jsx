import React from "react";
import { TextField, Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const Input = ({ name, label, error, errorMessage, ...rest }) => {
  const matches = useMediaQuery("(max-width:900px)");

  return (
    <Grid container spacing={5} justify="center" alignItems="center">
      <Grid item xs={12} sm={10}>
        <TextField
          {...rest}
          error={error}
          id={name}
          style={{ width: matches ? "66vW" : "33vW" }}
          label={label}
          variant="outlined"
          helperText={errorMessage}
          color="secondary"
        />
      </Grid>
    </Grid>
  );
};

export default Input;
