import React from 'react';
import { Box, Text } from 'ink';
import get from 'lodash/get';
import capitalize from 'lodash/capitalize';
import Actions from './Actions';

const THEME = {
  SELECTED: {
    color: 'white',
    backgroundColor: 'blue',
  },
  DEFAULT: {},
};

const Cell = ({ width, theme, children }) => (
  <Box width={width}>
    <Text {...theme}>{children}</Text>
  </Box>
);

class Table extends React.Component {
  state = {
    widthOfColums: {},
    selected: 0,
  };

  componentDidMount() {
    this.getWidthOfColumns();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data !== prevProps.data) {
      this.getWidthOfColumns();
    }
  }

  getWidthOfColumns = () => {
    const { headers, data } = this.props;
    const widthOfColums = {};

    headers
      .map(({ key }) => key)
      .forEach((header) => {
        const lengths = [
          header.length,
          ...data.map((d) => (d[header] ? d[header].length : 0)),
        ];

        widthOfColums[header] = Math.max(...lengths);
      });

    this.setState({ widthOfColums });
  };

  handleInput = (input, key) => {
    if (key.upArrow) {
      this.handleUp();
    } else if (key.downArrow) {
      this.handleDown();
    }
  };

  handleUp = () => {
    const { data } = this.props;
    const { selected } = this.state;

    this.setState({ selected: (selected + data.length - 1) % data.length });
  };

  handleDown = () => {
    const { data } = this.props;
    const { selected } = this.state;

    this.setState({ selected: (selected + 1) % data.length });
  };

  render() {
    const { headers, data, padding } = this.props;
    const { widthOfColums, selected } = this.state;

    if (data.length === 0) {
      return null;
    }

    return (
      <>
        <Actions handleInput={this.handleInput} />
        <Box flexDirection="row">
          {headers.map(({ key, name }) => (
            <Box key={key} width={widthOfColums[key] + padding}>
              <Text color="green">{capitalize(name)}</Text>
            </Box>
          ))}
        </Box>
        <Box flexDirection="column">
          {data.map((row, rowIndex) => (
            <Box key={rowIndex}>
              {headers.map(({ key }, colIndex) => (
                <Cell
                  key={key}
                  width={widthOfColums[key] + padding}
                  theme={
                    colIndex === 0 && rowIndex === selected
                      ? THEME.SELECTED
                      : THEME.DEFAULT
                  }
                >
                  {get(row, key, '')}
                </Cell>
              ))}
            </Box>
          ))}
        </Box>
      </>
    );
  }
}

Table.defaultProps = {
  headers: [],
  data: [],
  padding: 5,
};

export default Table;
