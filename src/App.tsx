import React from "react";
import { Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { Firebase, FirebaseContext } from "components/Firebase/";

import client from "./client";
import OrderPage from "pages/order";
import OrderListsPage from "pages/orderLists";
import OrderManagePage from "pages/orderManage";
import NotFoundPage from "pages/not-found";
import Layout from "components/Layout";
import LayoutWithoutHeading from "components/Layout/withOutHeading";
import GlobalStyle from "global-styles";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        rest.useLayout ? (
          <LayoutWithoutHeading>
            <Component {...props} />
          </LayoutWithoutHeading>
        ) : (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
    />
  );
};

function App() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <ApolloProvider client={client}>
        <Switch>
          <PublicRoute exact path="/" component={OrderPage} useLayout={true} />
          <PublicRoute
            exact
            path="/order-lists"
            component={OrderListsPage}
            useLayout={false}
          />
          <PublicRoute
            exact
            path="/order-manage"
            component={OrderManagePage}
            useLayout={false}
          />
          <PublicRoute path="" component={NotFoundPage} useLayout={true} />
        </Switch>
        <GlobalStyle />
      </ApolloProvider>
    </FirebaseContext.Provider>
  );
}

export default App;
