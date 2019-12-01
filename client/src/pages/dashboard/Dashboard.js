import React from "react";
import { useQuery } from '@apollo/react-hooks';
import NotificationBlock from '../../components/Notification/NotificationBlock';

import {
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

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

  // Getting the initial data for BigStats
  const measurement_types = useQuery(Measurements.GET_MEASUREMENT_TYPES).data;

  var bigStatGrid;

  if(measurement_types){
    bigStatGrid = measurement_types.allMeasurementTypes.nodes.map(measurement_type => (
      <Grid item md={4} sm={6} xs={12} key={measurement_type.id}>
        <BigStat measurement_type_id={measurement_type.id} name={measurement_type.name} />
      </Grid>
    ))
  } else {
    bigStatGrid = <p>Loading...</p>
  }

  const measurement_types2 = useQuery(Notifications.GET_LATEST_MEASUREMENTS_WITH_NOTIFICATIONS).data;

  
  var notificationBlocks = [];

  if(measurement_types2){
    console.log(measurement_types2);
    measurement_types2.allMeasurements.nodes.map((currentValue) => {
      let value = currentValue.value;
      let alertArr = currentValue.measurementTypeByMeasurementTypeId.rulesByMeasurementTypeId.nodes;
      if (alertArr[0]) {
        if (value > alertArr[2].maxValue) {
          notificationBlocks.push( 
          <Paper>
            <Typography variant="h5" component="h3">
              {alertArr[2].description}
            </Typography>
            <Typography component="p">
              {alertArr[2].suggestion}
            </Typography>
          </Paper>
          )
        }
        else if (value > alertArr[1].maxValue) {
          notificationBlocks.push(
          <Paper>
            <Typography variant="h5" component="h3">
              {alertArr[1].description}
            </Typography>
            <Typography component="p">
              {alertArr[1].suggestion}
            </Typography>
          </Paper>
          )
        }
        else if (value > alertArr[0].maxValue) {
          notificationBlocks.push(
          <Paper>
            <Typography variant="h5" component="h3">
              {alertArr[0].description}
            </Typography>
            <Typography component="p">
              {alertArr[0].suggestion}
            </Typography>
          </Paper>
          )
        }
      }
    }
    );
  }

  return (
    <>
      <PageTitle title="Dashboard" />
      <div className={classes.notificationBlock}>
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
