import { gql } from 'apollo-boost';

export default class Measurements {

  static GET_MEASUREMENT_TYPES = gql`
    query getMeasurementTypes {
      allMeasurementTypes {
        nodes {
          id
          name
        }
      }
    }`;

  static GET_MEASUREMENTS = gql`
    query getMeasurements($type_id: Int!) {
      allMeasurements(condition: {measurementTypeId: $type_id}) {
        nodes {
          id
          value
          datetime
        }
      }
    }`;
  
  static GET_LAST_MEASUREMENTS_BY_TYPE = gql`
    query MyQuery($last_n: Int!) {
      allMeasurementTypes {
        nodes {
          measurementsByMeasurementTypeId(last: $last_n) {
            nodes {
              value
              datetime
            }
          }
          id
          name
        }
      }
    }`;
}