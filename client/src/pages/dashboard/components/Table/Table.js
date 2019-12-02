import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";

export default function TableComponent({ data }) {
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, medidor, xenonio, uranio, radioativade, temperatura, pressao, energia}) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{medidor}</TableCell>
            <TableCell>{xenonio}</TableCell>
            <TableCell>{uranio}</TableCell>
            <TableCell>{radioativade}</TableCell>
            <TableCell>{temperatura}</TableCell>
            <TableCell>{pressao}</TableCell>
            <TableCell>{energia}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
