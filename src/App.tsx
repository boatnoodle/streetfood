import React from "react";
import { Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { Firebase, FirebaseContext } from "components/Firebase/";

import client from "./client";
import OrderPage from "pages/order";
import NotFoundPage from "pages/not-found";
import Layout from "components/Layout";
import GlobalStyle from "global-styles";

function App() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <ApolloProvider client={client}>
        <Layout>
          <Switch>
            <Route exact path="/" component={OrderPage} />
            <Route path="" component={NotFoundPage} />
          </Switch>
          <GlobalStyle />
        </Layout>
      </ApolloProvider>
    </FirebaseContext.Provider>
  );
}

export default App;
