import { gql } from 'apollo-boost';

export default class Notifications {

  static GET_LATEST_MEASUREMENTS_WITH_NOTIFICATIONS = gql`
  query getLatestMeasurementsWithNotifications {
    allMeasurements(last: 6) {
      nodes {
        measurementTypeByMeasurementTypeId {
          name
          id
          rulesByMeasurementTypeId {
            nodes {
              alertLevel
              maxValue
              description
              suggestion
            }
          }
        }
        value
      }
    }
  }`;
}