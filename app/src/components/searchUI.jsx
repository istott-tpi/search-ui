import React, {useState} from "react";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { IoFilterSharp } from "react-icons/io5";
import SearchIcon from '@mui/icons-material/Search';
import { MdLocationPin } from "react-icons/md";
// import { useAppSelector } from '../store';
// import { ILocation } from '../zuma/location/interfaces';

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields
} from "./config-helper";

const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
const connector = new AppSearchAPIConnector({
  searchKey,
  engineName,
  hostIdentifier,
  endpointBase
});
const config = {
  searchQuery: {
    facets: buildFacetConfigFromConfig(),
    ...buildSearchOptionsFromConfig()
  },
  autocompleteQuery: buildAutocompleteQueryConfig(),
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true
};

export default function SearchUI() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
    <SearchProvider config={config}>
      <WithSearch 
      mapContextToProps={({ wasSearched, searchTerm, setSearchTerm, results }) => ({ wasSearched, searchTerm, setSearchTerm, results })}>
        {({ wasSearched, searchTerm, setSearchTerm, results }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={      
                    <Paper
                        className="main-search"
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: '2rem', width: 400 }}
                    >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search google maps' }}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <IoFilterSharp />
                        </IconButton>
                    </Paper> 
                  }
                  sideContent={
                    <div>
                      {wasSearched && (
                        <Sorting
                          label={"Sort by"}
                          sortOptions={buildSortOptionsFromConfig()}
                        />
                      )}
                      {getFacetFields().map(field => (
                        <Facet key={field} field={field} label={field} />
                      ))}
                    </div>
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyContent={
                    <Results
                      titleField={getConfig().titleField}
                      urlField={getConfig().urlField}
                      thumbnailField={getConfig().thumbnailField}
                      shouldTrackClickThrough={true}
                    />
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
    {/* <Paper
        className="main-search"
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: '2rem', width: 400 }}
    >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
            <SearchIcon />
        </IconButton>
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search google maps' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <IoFilterSharp />
        </IconButton>
    </Paper> */}
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
    
    </>
  );
}


{/* <SearchProvider config={config}>
<WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
  {({ wasSearched }) => {
    return (
      <div className="App">
        <ErrorBoundary>
          <Layout
            header={<SearchBox autocompleteSuggestions={true} />}
            sideContent={
              <div>
                {wasSearched && (
                  <Sorting
                    label={"Sort by"}
                    sortOptions={buildSortOptionsFromConfig()}
                  />
                )}
                {getFacetFields().map(field => (
                  <Facet key={field} field={field} label={field} />
                ))}
              </div>
            }
            bodyHeader={
              <React.Fragment>
                {wasSearched && <PagingInfo />}
                {wasSearched && <ResultsPerPage />}
              </React.Fragment>
            }
            bodyContent={
              <Results
                titleField={getConfig().titleField}
                urlField={getConfig().urlField}
                thumbnailField={getConfig().thumbnailField}
                shouldTrackClickThrough={true}
              />
            }
            bodyFooter={<Paging />}
          />
        </ErrorBoundary>
      </div>
    );
  }}
</WithSearch>
</SearchProvider> */}