import React from "react";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  formControl: {
    minWidth: "200px",
    margin: "10px",
  },
});

export default function Controller({
  useAlgo,
  handelAlgoChange,
  handelStartBtnClick,
  handleResetButtonClick,
}) {
  const classes = useStyles();
  return (
    <div>
      <FormControl id="algorithm_select" className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">
          Path Finding Algorithm
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={useAlgo}
          onChange={handelAlgoChange}
        >
          <MenuItem value={1}>Dijkstra</MenuItem>
          <MenuItem value={2}>A Star</MenuItem>
          <MenuItem value={3}>BFS</MenuItem>
          <MenuItem value={4}>DFS</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handelStartBtnClick()}
      >
        Start
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleResetButtonClick()}
      >
        Reset
      </Button>
    </div>
  );
}
