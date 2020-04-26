import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export default function Label() {
  return (
    <div className="top-label">
      <Paper elevation={0}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item>
            <div className="node node-finish"></div>
          </Grid>
          <Grid item>
            <div>Target node</div>
          </Grid>
          <Grid item>
            <div className="node node-start"></div>
          </Grid>
          <Grid item>
            <div>Start node</div>
          </Grid>
          <Grid item>
            <div className="node"></div>
          </Grid>
          <Grid item>
            <div>Unvisited node</div>
          </Grid>
          <Grid item>
            <div className="node node-wall"></div>
          </Grid>
          <Grid item>
            <div>Obstacle node</div>
          </Grid>
          <Grid item>
            <div className="node visited-3"></div>
          </Grid>
          <Grid item>
            <div>Path</div>
          </Grid>
          <Grid item>
            <div className="node visited-1"></div>
            <div className="node visited-2"></div>
            <div className="node visited-4"></div>
          </Grid>
          <Grid item>
            <div>Visited node</div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
