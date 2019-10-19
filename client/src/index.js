import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
// or you can use `import gql from 'graphql-tag';` instead

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

client
  .query({
    query: gql`
      {
        allMeasurementTypes {
          edges {
            node {
              id
              name
              rulesByMeasurementTypeId {
                nodes {
                  description
                  alertLevel
                  id
                  maxValue
                }
              }
            }
          }
        }
      }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(
  <LayoutProvider>
    <UserProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </UserProvider>
  </LayoutProvider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
