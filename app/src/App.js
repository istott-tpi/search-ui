import React from "react";
import SearchUI from "./components/searchUI";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import './App.css';

import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new AppSearchAPIConnector({
  searchKey: "search-371auk61r2bwqtdzocdgutmg",
  engineName: "search-ui-examples",
  endpointBase: "http://127.0.0.1:3002",
  cacheResponses: false
});

export default function App() {
  return (
    <>
    {/* <SearchProvider
      config={{
        apiConnector: connector
      }}
    >
      <div className="App">
        <Layout
          header={<SearchBox />}
          bodyContent={<Results titleField="title" urlField="nps_link" />}
        />
      </div>
    </SearchProvider> */}
    {/* <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ searchTerm, setSearchTerm, results }) => ({
          searchTerm,
          setSearchTerm,
          results
        })}
      >
        {({ searchTerm, setSearchTerm, results }) => {
          return (
            <div>
              <input
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {results.map(r => (
                <div key={r.id.raw}>{r.title.raw}</div>
              ))}
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider> */}

    <SearchUI />
    </>
  );
}
