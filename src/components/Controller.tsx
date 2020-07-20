import React from "react";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import {
  setPathAlgo,
  clearWall,
  resetAll,
  startPathFind,
  setSpeed,
} from "../actions/index";

interface IComponentProps {
  useAlgo: number;
  isReady: boolean;
  isFinding: boolean;
  speed: string;
  setPathAlgo: (Algo: number) => void;
  clearWall: () => void;
  resetAll: () => void;
  setSpeed: (speed: string) => void;
  startPathFind: (isReady: boolean) => void;
}

interface IComponentState {
  useAlgo: number;
  isFinding: boolean;
  isReady: boolean;
  speed: string;
}

const useStyles = makeStyles({
  formControl: {
    minWidth: "200px",
    margin: "10px",
  },
  radioGroup: {
    alignItems: "center",
    margin: "5px",
    padding: "5px",
    fontFamily: "'Anton', sans-serif",
  },
  radioformControl: {
    minWidth: "200px",
    // maxWidth: "250px",
    margin: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Controller: React.FC<IComponentProps> = ({
  useAlgo,
  isFinding,
  isReady,
  speed,
  setPathAlgo,
  clearWall,
  resetAll,
  startPathFind,
  setSpeed,
}) => {
  const classes = useStyles();

  const handelStartBtnClick = () => {
    if (!isReady) startPathFind(!isReady);
    else {
      //resetall
      resetAll();
    }
  };

  const handelAlgoChange = (e: any, value: any) => {
    setPathAlgo(value.props.value);
  };

  const handleSpeedChange = (e: any, value: any) => {
    setSpeed(value);
  };

  const handleClearWall = () => {
    clearWall();
  };
  return (
    <>
      <Paper elevation={0}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item>
            <RadioGroup
              className={classes.radioformControl}
              aria-label="speed"
              name="speed"
              value={speed}
              onChange={handleSpeedChange}
              row
            >
              <Typography className={classes.radioGroup}>
                Animation Speed
              </Typography>

              <>
                <FormControlLabel
                  value="100"
                  control={<Radio color="primary" />}
                  label="slow"
                  disabled={isFinding}
                />
                <FormControlLabel
                  value="10"
                  control={<Radio color="primary" />}
                  label="mid"
                  disabled={isFinding}
                />
                <FormControlLabel
                  value="1"
                  control={<Radio color="primary" />}
                  label="fast"
                  disabled={isFinding}
                />
              </>
            </RadioGroup>
          </Grid>
          <Grid item>
            <FormControl
              id="algorithm_select"
              className={classes.formControl}
              disabled={isFinding}
            >
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
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handelStartBtnClick}
              disabled={isFinding}
            >
              {isReady
                ? "Reset"
                : `Start  
              ${
                useAlgo === 1
                  ? " - Dijkstra"
                  : useAlgo === 2
                  ? " - A Star"
                  : useAlgo === 3
                  ? " - BFS"
                  : useAlgo === 4
                  ? " - DFS"
                  : ""
              }`}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClearWall}
              disabled={isFinding}
            >
              Clear Obstacle
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

const MapStateToProps = (state: IComponentState) => ({
  useAlgo: state.useAlgo,
  isFinding: state.isFinding,
  isReady: state.isReady,
  speed: state.speed,
});

const MapDispatchToProps = (dispatch: any) => ({
  setPathAlgo: (Algo: number) => dispatch(setPathAlgo({ Algo })),
  clearWall: () => dispatch(clearWall({})),
  resetAll: () => dispatch(resetAll({})),
  startPathFind: (isReady: boolean) => dispatch(startPathFind({ isReady })),
  setSpeed: (speed: string) => dispatch(setSpeed(speed)),
});

export default connect(MapStateToProps, MapDispatchToProps)(Controller);
