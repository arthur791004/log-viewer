import React from 'react';
import { Box, Text } from 'ink';
import { UncontrolledTextInput } from 'ink-text-input';

const SearchBar = ({ handleSearch }) => (
  <Box marginBottom={1}>
    <Box marginRight={1}>
      <Text color="yellow">Search Log:</Text>
    </Box>
    <UncontrolledTextInput
      placeholder="searched by key:value"
      onSubmit={handleSearch}
    />
  </Box>
);

export default SearchBar;
