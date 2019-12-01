import React from "react";
import {
  Typography,
  Paper,
} from "@material-ui/core";
import styles from "./styles";
import { useQuery } from '@apollo/react-hooks';
import Notifications from "../../models/Notifications";

export default class NotificationBlock extends React.Component {
  constructor() {
    super();
    this.state = {measures: ""};
  }

  getMeasurements() {
    this.state.measures = useQuery(Notifications.GET_LATEST_MEASUREMENTS_WITH_NOTIFICATIONS).data;
    console.log(this.state.measures);
  }

  render() {
    {this.getMeasurements()};
    return(
      <Paper>
        <div className={styles.notificationBlockText}>
          <Typography variant="h5" component="h3">
            This is a sheet of paper.
          </Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
          </Typography>
        </div>
      </Paper>
    );
  }
};