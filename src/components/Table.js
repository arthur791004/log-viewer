import React from 'react';
import { Box, Text } from 'ink';
import get from 'lodash/get';
import capitalize from 'lodash/capitalize';
import { removeQuotedString } from '@/utils';
import Actions from './Actions';
import SearchBar from './SearchBar';
import Badge from './Badge';

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
    filters: [],
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

    headers.forEach(({ key, name }) => {
      widthOfColums[key] = Math.max(
        ...[name.length, ...data.map((d) => get(d, key, '').length)]
      );
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

  handleSearch = (keywords) => {
    const filters =
      keywords.trim().length > 0
        ? keywords
            .trim()
            .split(/ +(?=[\w]+\:)/g)
            .map((keyword) =>
              keyword.split(':').map((value) => removeQuotedString(value))
            )
        : [];

    this.setState({
      filters,
    });
  };

  render() {
    const { headers, data, padding } = this.props;
    const { widthOfColums, filters, selected } = this.state;

    if (data.length === 0) {
      return null;
    }

    return (
      <>
        <Actions handleInput={this.handleInput} />
        <SearchBar handleSearch={this.handleSearch} />
        {filters.length > 0 && (
          <Box marginBottom={1}>
            {filters.map(([name, value]) => (
              <Badge>{`${name}: ${value}`}</Badge>
            ))}
          </Box>
        )}
        <Box flexDirection="row">
          {headers.map(({ key, name }) => (
            <Box key={key} width={widthOfColums[key] + padding}>
              <Text color="blue" bold>
                {capitalize(name)}
              </Text>
            </Box>
          ))}
        </Box>
        <Box flexDirection="column">
          {data
            .filter((row) =>
              filters.every(([name, value]) =>
                get(row, name, '').includes(value)
              )
            )
            .map((row, rowIndex) => (
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
  padding: 2,
};

export default Table;
