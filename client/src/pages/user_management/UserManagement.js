import React from "react";
import { useQuery } from '@apollo/react-hooks';

import useStyles from "./styles";

import User from "../../models/User";

import { Table, TableHead, TableCell, TableBody, TableRow, Paper, Button, TextField } from "@material-ui/core";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function UserManagement() {
  const { data, loading } = useQuery(User.GET_USERS);
  const classes = useStyles();

  console.log(data);

  const handleSubmit = function() {
    console.log('submit');
  }

  const header_order = [
    {id: 'id', label: 'ID', editable: false},
    {id: 'name', label: 'Nome', editable: true},
    {id: 'email', label: 'E-Mail', editable: true},
    {id: 'username', label: 'Usuário', editable: true},
  ]

  var result;

  if(loading){
    result = <p>Loading...</p>;
  } else {
    result = <form onSubmit={handleSubmit}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                {header_order.map(header => (
                  <TableCell key={header.id}>{header.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.allUsers.nodes.map(user => (
                <TableRow key={user.id}>
                  {header_order.map(header => (
                    <TableCell key={header.id}>
                      {header.editable ? (
                        <TextField id={header.id} defaultValue={user[header.id]}/>
                      ) : ( 
                        <TextField id={header.id} defaultValue={user[header.id]} disabled/>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Button type="submit" variant="contained">Salvar</Button>
      </div>
    </form>
  }

  return (<>
    <PageTitle title="Usuários" />
    {result}
    </>);
}