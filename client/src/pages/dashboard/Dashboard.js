import React from "react";
import { useQuery } from '@apollo/react-hooks';

import {
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import Measurements from "../../models/Measurements";
import Notifications from "../../models/Notifications";

export default function Dashboard(props) {
  var classes = useStyles();

  const measurement_types2 = useQuery(Notifications.GET_LATEST_MEASUREMENTS_WITH_NOTIFICATIONS).data;

  var notificationBlocks = [];
  var colors = [];

  if(measurement_types2){
    measurement_types2.allMeasurements.nodes.map((currentValue) => {
      let value = currentValue.value;
      let colorId = currentValue.measurementTypeByMeasurementTypeId.id - 1;
      let alertArr = currentValue.measurementTypeByMeasurementTypeId.rulesByMeasurementTypeId.nodes;
      if (alertArr[0]) {
        if (value > alertArr[2].maxValue) {
          colors[colorId] = "#FF2828";
          notificationBlocks.push( 
          <Paper className={classes.notificationThird}>
            <Typography variant="h5" component="h3">
              {alertArr[2].description}
            </Typography>
            <Typography component="p">
              Sugestão: {alertArr[2].suggestion}
            </Typography>
          </Paper>
          )
        }
        else if (value > alertArr[1].maxValue) {
          colors[colorId] = "#FFAE00";
          notificationBlocks.push(
          <Paper className={classes.notificationSecond}>
            <Typography variant="h5" component="h3">
              {alertArr[1].description}
            </Typography>
            <Typography component="p">
            Sugestão: {alertArr[1].suggestion}
            </Typography>
          </Paper>
          )
        }
        else if (value > alertArr[0].maxValue) {
          colors[colorId] = "#ECD44D";
          notificationBlocks.push(
          <Paper className={classes.notificationFirst}>
            <Typography variant="h5" component="h3">
              {alertArr[0].description}
            </Typography>
            <Typography component="p">
            Sugestão: {alertArr[0].suggestion}
            </Typography>
          </Paper>
          )
        }
        else {
          colors[colorId] = "#48CF38";
        }
      }
      else{
        colors[colorId] = "#48CF38";
      }
    }
    );
  }

  // Getting the initial data for BigStats
  const measurement_types = useQuery(Measurements.GET_MEASUREMENT_TYPES).data;

  var bigStatGrid;

  if(measurement_types){
    bigStatGrid = measurement_types.allMeasurementTypes.nodes.map(measurement_type => {
      var color = colors[measurement_type.id-1];
      return (
      <Grid item md={4} sm={6} xs={12} key={measurement_type.id}>
        <BigStat measurement_type_id={measurement_type.id} name={measurement_type.name} color={color}/>
      </Grid>
    )}
    )
  } else {
    bigStatGrid = <p>Loading...</p>
  }

  return (
    <>
      <PageTitle title="Dashboard" />
      <div>
      {notificationBlocks.map(child => child)}
      </div>
      <Grid container spacing={4}>
        {bigStatGrid}
        <Grid item xs={12}>
          <Widget
            title="Medidas mais recentes"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={mock.table} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
