import React from 'react';
import { DEFAULT_HEADERS } from '@/constants';
import Table from './Table';

const transformHeaders = (headers) =>
  headers.map((header) => {
    if (typeof header === 'string') {
      return {
        key: header,
        name: header,
      };
    } else if (typeof header === 'object') {
      const { key, name } = header;
      return {
        key,
        name: name || key,
      };
    } else {
      return {};
    }
  });

class App extends React.Component {
  constructor(props) {
    super(props);

    const { config } = props;
    const { headers } = config;

    this.state = {
      headers: transformHeaders(headers),
    };
  }

  render() {
    const { logs } = this.props;
    const { headers } = this.state;

    return <Table headers={headers} data={logs} />;
  }
}

export default App;
