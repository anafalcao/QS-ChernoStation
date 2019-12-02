import React, { useState } from "react";
import { useQuery } from '@apollo/react-hooks';

import { Grid, Select, MenuItem, Input } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { BarChart, Bar } from "recharts";
import classnames from "classnames";
import Measurements from "../../../../models/Measurements";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../../components/Widget";
import { Typography } from "../../../../components/Wrappers";

export default function BigStat(props) {
  var { measurement_type_id, name, color } = props;

  var { data, loading, error } = useQuery(Measurements.GET_MEASUREMENTS, 
    {variables: {type_id: measurement_type_id}});
  
  var averages;
  var render_widget;

  var classes = useStyles();

  // local
  var [value, setValue] = useState("daily");

  if(loading){
    render_widget = <p>Loading...</p>
  } else if(error){
    render_widget = <p>Error...</p>
  } else {
    averages = computeAverages(data.allMeasurements.nodes);

    render_widget = 
      <Widget
        header={
          <div className={classes.title }>
            <Typography variant="h4" weight="bold">{name}</Typography>

            <Select
              value={value}
              onChange={e => setValue(e.target.value)}
              input={
                <Input
                  disableUnderline
                  classes={{ input: classes.selectInput }}
                />
              }
              className={classes.select}
            >
              <MenuItem value="daily">Diário</MenuItem>
              <MenuItem value="weekly">Semanal</MenuItem>
              <MenuItem value="monthly">Mensal</MenuItem>
            </Select>
          </div>
        }
        upperTitle
      >
        <div className={classes.totalValueContainer}>
          <div className={classes.totalValue}>
            <Typography size="xxl" color="text" colorBrightness="secondary">
              {averages.means[value]}
            </Typography>
          </div>
          <BarChart width={150} height={70} data={averages.data[value]}>
          <Bar
              dataKey="value"
              radius={10}
              barSize={10}
              fill={color}
            />
          </BarChart>
        </div>
        <div className={classes.bottomStatsContainer}>
          <div className={classnames(classes.statCell, classes.borderRight)}>
            <Grid container alignItems="center">
              <Typography variant="h6">{averages.entries[value]}</Typography>
              <ArrowForwardIcon
                className={classnames(classes.profitArrow, {
                  [averages.entries[value] < 0]: classes.profitArrowDanger,
                })}
              />
            </Grid>
            <Typography size="sm" color="text" colorBrightness="secondary">
              Nº de Medidas
            </Typography>
          </div>
          <div className={classes.statCell}>
            <Grid container alignItems="center">
              <Typography variant="h6">{averages.max[value]}</Typography>
            </Grid>
            <Typography size="sm" color="text" colorBrightness="secondary">
              Max
            </Typography>
          </div>
          <div className={classes.statCell}>
            <Grid container alignItems="center">
              <Typography variant="h6">{averages.min[value]}</Typography>
            </Grid>
            <Typography size="sm" color="text" colorBrightness="secondary">
              Min
            </Typography>
          </div>
        </div>
      </Widget>
  }

  return (render_widget);
}

function computeAverages(measurements) {
  var results = {
    data : {monthly: [], weekly: [], daily: []},
    totals : {monthly: 0, weekly: 0, daily: 0},
    entries : {monthly: 0, weekly: 0, daily: 0},
    means : {monthly: 0, weekly: 0, daily: 0},
    min : {monthly: undefined, weekly: undefined, daily: undefined},
    max : {monthly: undefined, weekly: undefined, daily: undefined},
  }
  
  const today = new Date();
  
  measurements.forEach(function(measurement){
    var time_frame_matches = [];

    const measurement_date = new Date(measurement.datetime)
    const diff_in_days = (today.getTime() - measurement_date.getTime()) / (1000 * 3600 * 24);

    if(diff_in_days <= 1){
      time_frame_matches.push('daily');
    }
    if(diff_in_days <= 7){
      time_frame_matches.push('weekly');
    }
    if(diff_in_days <= 30){
      time_frame_matches.push('monthly');
    }

    time_frame_matches.forEach(function(time_frame){
      results.data[time_frame].push({value: measurement.value});
      results.totals[time_frame] += measurement.value;
      results.entries[time_frame] += 1;
      
      if(results.max[time_frame] === undefined){
        results.max[time_frame] = measurement.value;
      } else {
        results.max[time_frame] = Math.max(results.max[time_frame], measurement.value);
      }
      if(results.min[time_frame] === undefined){
        results.min[time_frame] = measurement.value;
      } else {
        results.min[time_frame] = Math.min(results.min[time_frame], measurement.value);
      }
    })
  })

  Object.keys(results.data).forEach(function(time_frame){
    results.means[time_frame] = (results.totals[time_frame]/results.entries[time_frame]).toFixed(2);
    results.max[time_frame] = results.max[time_frame].toFixed(2);
    results.min[time_frame] = results.min[time_frame].toFixed(2);
  })

  return results;
}