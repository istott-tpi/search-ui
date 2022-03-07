import React from "react";

import {Paper, InputBase, Box, IconButton, Button} from '@mui/material';
import { IoFilterSharp } from "react-icons/io5";
import SearchIcon from '@mui/icons-material/Search';

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import {SearchProvider, WithSearch} from "@elastic/react-search-ui";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import {buildAutocompleteQueryConfig, buildFacetConfigFromConfig, buildSearchOptionsFromConfig, getConfig} from "./config-helper";

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

  return (
    <>
    <SearchProvider config={config}>
      <WithSearch 
      mapContextToProps={({ wasSearched, searchTerm, setSearchTerm, results }) => ({ wasSearched, searchTerm, setSearchTerm, results })}>
        {({ wasSearched, searchTerm, setSearchTerm, results }) => {
          console.log(results)
          return (
            <Paper sx={{height: '100vh', width: '100vw', padding: '20px 0 0 20px', backgroundColor: 'blue'}} >
            <Paper
                className="main-search"
                component="form"
                sx={{ p: '2px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: 400,  width: 400, overflow: 'auto' }}
            >
              <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between' }} >
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
              </Box>
              {!!searchTerm &&
                <Box sx={{overflow: 'auto', width: '100%'}} >
                  {wasSearched && results.map(result => (
                      <div key={result.id.raw}>
                        <Button>Client Name: {result?.name?.raw}</Button>
                        
                      </div>

                  ))}
                </Box>
              }
            </Paper> 
            </Paper>
          );
        }}
      </WithSearch>
    </SearchProvider>
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