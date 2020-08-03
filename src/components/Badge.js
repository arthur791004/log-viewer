import React from 'react';
import { Box, Text } from 'ink';

const Badge = ({ children }) => (
  <Box marginRight={1}>
    <Text color="white" backgroundColor="red">
      {children}
    </Text>
  </Box>
);

export default Badge;
