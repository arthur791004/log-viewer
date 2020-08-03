import React from 'react';
import { Box, Text, useInput } from 'ink';

const Command = ({ keyName, description }) => (
  <Text color="yellow">{`[${keyName.toUpperCase()}] ${description}`}</Text>
);

const Actions = ({ commands, handleInput }) => {
  useInput((input, key) => {
    if (input === 'q') {
      process.exit(0);
    } else if (commands[input]) {
      commands[input].handleAction();
    } else {
      handleInput(input, key);
    }
  });

  return (
    <Box marginTop={1} marginBottom={1}>
      <Command keyName="q" description="Quit" />
      {Object.keys(commands).map((key) => {
        const { keyName, description } = commands[key];
        return <Command keyName={keyName} description={description} />;
      })}
    </Box>
  );
};

Actions.defaultProps = {
  commands: {},
  handleInput: () => {},
};

export default Actions;
