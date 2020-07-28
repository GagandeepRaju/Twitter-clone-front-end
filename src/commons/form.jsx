import React, { Component } from "react";
import Input from "./input";
import Grid from "@material-ui/core/Grid";
import Joi from "joi-browser";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

class Form extends Component {
  state = {
    data: {},
    fileSelected: {},
    errors: {},
  };

  handlefileChange = ({ currentTarget: input }) => {
    //
    const fileSelected = input.files[0];
    this.setState({ fileSelected });
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ id: name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.id] = errorMessage;
    else delete errors[input.id];

    const data = { ...this.state.data };
    data[input.id] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderPostInput(name, label, type = "text") {
    const data = { ...this.state.data };

    return (
      <Input
        error={false}
        type={type}
        name={name}
        value={data[name] || ""}
        label={label}
        onChange={this.handleChange}
      />
    );
  }

  renderPostCmntInput(id, name, label, type = "text") {
    const data = { ...this.state.data };

    return (
      <Input
        error={false}
        type={type}
        name={id}
        value={data[name] || ""}
        label={label}
        onChange={this.handleChange}
      />
    );
  }

  renderInput(name, label, type = "text", disabled = false) {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };

    return (
      <Input
        error={errors[name] ? true : false}
        errorMessage={errors[name]}
        type={type}
        name={name}
        value={data[name] || ""}
        label={label}
        disabled={disabled}
        onChange={this.handleChange}
      />
    );
  }

  renderMultilineInput(name, label, type = "text") {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    return (
      <Input
        error={errors[name] ? true : false}
        errorMessage={errors[name]}
        type={type}
        name={name}
        value={data[name] || ""}
        label={label}
        onChange={this.handleChange}
        multiline
        rows="2"
      />
    );
  }

  renderButton(label, type) {
    const buttonEnable = this.validate() ? true : false;
    return (
      <Button
        disabled={buttonEnable}
        type={type}
        variant="contained"
        style={{
          marginTop: "20px",
          marginLeft: "3.2em",
          marginBottom: "1em",
          color: "#FFF",
          backgroundColor: "#55acee",
          borderRadius: "20px",
        }}
      >
        {label}
      </Button>
    );
  }

  renderFileInput(name, label) {
    return (
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginBottom: "10px" }}
      >
        <label htmlFor="text-button-file">
          <Button
            variant="contained"
            color="default"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            <input
              accept="image/*"
              id="text-button-file"
              type="file"
              name={name}
              label={label}
              hidden
              onChange={this.handlefileChange}
            />
            Upload
          </Button>
        </label>
      </Grid>
    );
  }
}

export default Form;
