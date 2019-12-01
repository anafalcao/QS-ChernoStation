import React from "react";
import { useQuery } from '@apollo/react-hooks';

import { Grid } from "@material-ui/core";
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

  return (
    <>
      <PageTitle title="Dashboard" />
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
