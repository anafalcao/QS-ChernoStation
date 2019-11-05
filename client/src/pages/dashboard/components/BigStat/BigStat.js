import React, { useState } from "react";
import { useQuery } from '@apollo/react-hooks';

import { Grid, Select, MenuItem, Input } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { BarChart, Bar } from "recharts";
import classnames from "classnames";
import Measurements from "../../../../models/Measurements";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../../components/Widget";
import { Typography } from "../../../../components/Wrappers";

export default function BigStat(props) {
  var { measurement_type_id, name } = props;

  const { data, loading, error } = useQuery(Measurements.GET_MEASUREMENTS, {variables: {type_id: measurement_type_id}});
  console.log('-------measurement_type----------');
  console.log(data, loading, error);

  var total = {};
  var color = {};
  var bounce = {};
  var registrations = {};

  if(name === "Quantidade de Xennio"){
    total = {
      monthly: 4232,
      weekly: 1465,
      daily: 199,
      percent: { value: 3.7, profit: false }
    };
    color = "primary";
    registrations = {
      monthly: { value: 830, profit: false },
      weekly: { value: 215, profit: true },
      daily: { value: 33, profit: true }
    };
    bounce = {
      monthly: { value: 4.5, profit: false },
      weekly: { value: 3, profit: true },
      daily: { value: 3.25, profit: true }
    };
  }
  else if(name === "Quantidade de Uranio"){
    total = {
      monthly: 754,
      weekly: 180,
      daily: 27,
      percent: { value: 2.5, profit: true }
    };
    color = "warning";
    registrations = {
      monthly: { value: 32, profit: true },
      weekly: { value: 8, profit: true },
      daily: { value: 2, profit: false }
    };
    bounce = {
      monthly: { value: 2.5, profit: true },
      weekly: { value: 4, profit: false },
      daily: { value: 4.5, profit: false }
    };
  }
  else {
    total = {
      monthly: 1025,
      weekly: 301,
      daily: 44,
      percent: { value: 3.1, profit: true }
    };
    color = "secondary";
    registrations = {
      monthly: { value: 230, profit: true },
      weekly: { value: 58, profit: false },
      daily: { value: 15, profit: false }
    };
    bounce = {
      monthly: { value: 21.5, profit: false },
      weekly: { value: 19.35, profit: false },
      daily: { value: 10.1, profit: true }
    };
  }

  var classes = useStyles();
  var theme = useTheme();

  // local
  var [value, setValue] = useState("daily");

  return (
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
            {total[value]}
          </Typography>
          <Typography color={total.percent.profit ? "success" : "secondary"}>
            &nbsp;{total.percent.profit ? "+" : "-"}
            {total.percent.value}%
          </Typography>
        </div>
        <BarChart width={150} height={70} data={getRandomData()}>
          <Bar
            dataKey="value"
            fill={theme.palette[color].main}
            radius={10}
            barSize={10}
          />
        </BarChart>
      </div>
      <div className={classes.bottomStatsContainer}>
        <div className={classnames(classes.statCell, classes.borderRight)}>
          <Grid container alignItems="center">
            <Typography variant="h6">{registrations[value].value}</Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [!registrations[value].profit]: classes.profitArrowDanger,
              })}
            />
          </Grid>
          <Typography size="sm" color="text" colorBrightness="secondary">
            Registrations
          </Typography>
        </div>
        <div className={classes.statCell}>
          <Grid container alignItems="center">
            <Typography variant="h6">{bounce[value].value}%</Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [!registrations[value].profit]: classes.profitArrowDanger,
              })}
            />
          </Grid>
          <Typography size="sm" color="text" colorBrightness="secondary">
            Bounce Rate
          </Typography>
        </div>
        <div className={classnames(classes.statCell, classes.borderRight)}>
          <Grid container alignItems="center">
            <Typography variant="h6">
              {registrations[value].value * 10}
            </Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [classes.profitArrowDanger]: !registrations[value].profit,
              })}
            />
          </Grid>
          <Typography size="sm" color="text" colorBrightness="secondary">
            Views
          </Typography>
        </div>
      </div>
    </Widget>
  );
}

// #######################################################################

function getRandomData() {
  return Array(7)
    .fill()
    .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}
