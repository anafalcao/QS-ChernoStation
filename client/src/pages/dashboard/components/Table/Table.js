import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import Measurements from "../../../../models/Measurements";

export default function TableComponent() {
  const { data, loading } = useQuery(Measurements.GET_LAST_MEASUREMENTS_BY_TYPE,
    {variables: {last_n: 5}});

  var render_table;

  if(loading) {
    render_table = <p>Loading...</p>
  } else {
    var measurement_types = [];
    var measurement_rows = {};

    data.allMeasurementTypes.nodes.forEach(function(measurement_type){
      measurement_types.push({id: measurement_type.id, name: measurement_type.name});

      measurement_type.measurementsByMeasurementTypeId.nodes.forEach(function(measurement, index){
        if(!(index in measurement_rows)){
          measurement_rows[index] = {};
        }
        measurement_rows[index][measurement_type.id] = measurement.value;
      })
    })

    render_table = 
      <Table className="mb-0">
        <TableHead>
          <TableRow>
            {measurement_types.map(measurement_type => (
              <TableCell key={measurement_type.id}>{measurement_type.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(measurement_rows).map((measurements_by_type, index) => (
            <TableRow key={index}>
              {measurement_types.map(measurement_type => (
                <TableCell key={measurement_type.id}>{measurements_by_type[measurement_type.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>;
  }

  return render_table;
}
