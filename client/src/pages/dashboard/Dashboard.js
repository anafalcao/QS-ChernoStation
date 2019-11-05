import React from "react";
import { useQuery } from '@apollo/react-hooks';

import {
  Grid,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Button,
  Paper,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  XAxis,
} from "recharts";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import Queries from "../../queries";
import Measurements from "../../models/Measurements";

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  // form props
  const [values, setValues] = React.useState({
    medidor: '',
    periodo: '',
  });

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };
  

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
        {/* Form */}
        <Grid item xs={12}>
        <Paper className={classes.formGrid}>
            <form method="GET" action="controller" >
            <input type="hidden"
                   name="nomeDoTratadorDePagina"
                   value="mvc.pagehandlers.Tratador_pagina2_jsp" />
            <input type="hidden"
                   name="form"
                   value="form1" />
            <table className={classes.mainFormTable}>
              <tbody className={classes.mainFormBody}>
                <tr className={classes.mainFormRow}>
                    <td className={classes.mainFormItem}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="medidor-auto-width">Medidor</InputLabel>
                      <Select
                        value={values.medidor}
                        onChange={handleChange}
                        inputProps={{
                          name: 'medidor',
                          id: 'medidor-auto-width',
                        }}
                        autoWidth
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                    </td>
            <td id="datafinal" className={classes.mainFormItem}> 
            <TextField
              id="date"
              label="Data final a ser exibida"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />  
            </td>
            <td className={classes.mainFormItem}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="medidor-auto-width">Período</InputLabel>
                      <Select
                        value={values.periodo}
                        onChange={handleChange}
                        inputProps={{
                          name: 'periodo',
                          id: 'periodo-auto-width',
                        }}
                        autoWidth
                      >
                        <MenuItem value={"ano"}>Ano</MenuItem>
                        <MenuItem value={"mes"}>Mês</MenuItem>
                        <MenuItem value={"semana"}>Semana</MenuItem>
                        <MenuItem value={"dia"}>Dia</MenuItem>
                      </Select>
                    </FormControl>
            </td>
            
                </tr>
            
                <tr className={classes.mainFormRow}>
                  <td>
                    <Button variant="outlined" onClick={Queries.getRulesByMeasurement}>
                      Visualizar
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          </Paper>
        </Grid>
        {/* Form */}
        <Grid item xs={12}>
        <Widget title="Gráfico" upperTitle>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                width={500}
                height={300}
                data={mock.lineChartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperatura"
                  stroke={theme.palette.primary.main}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="pressao"
                  stroke={theme.palette.secondary.main}
                />
              </LineChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
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
