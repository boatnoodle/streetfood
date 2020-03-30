import React from "react";
import { Switch, Route } from "react-router-dom";
import OrderPage from "pages/order";
import NotFoundPage from "pages/not-found";
import Layout from "components/Layout";

import GlobalStyle from "global-styles";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={OrderPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </Layout>
  );
}

export default App;
