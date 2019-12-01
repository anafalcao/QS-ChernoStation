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
}