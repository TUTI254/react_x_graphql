import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://flyby-router-demo.herokuapp.com/", //uri specifies the URL of our GraphQL serve
  cache: new InMemoryCache(), //cache is an instance of InMemoryCache, which Apollo Client uses to cache query results after fetching them
});

client //client instance has a query method that we can use to send a query to our GraphQL server
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  }) //query method returns a Promise, which we can use to access the results of the query
  .then((result) => console.log(result)); //`result` is an object with a `data` property that contains the results of the query

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
