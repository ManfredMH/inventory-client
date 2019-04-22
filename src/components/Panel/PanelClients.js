import React from 'react';
import { Query } from 'react-apollo';
import { TOP_CLIENTS } from '../../queries';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const PanelClients = () => {
  return (
    <Query query={TOP_CLIENTS}>
      {({ loading, err, data }) => {
        if (loading) return 'Loading...';
        if (err) return `Error ${err.message}`;
        const topClientsGraph = [];
        data.topClients.map((order, index) => {
          return topClientsGraph[index] = {
            ...order.client[0],
            total: order.total
          };
        });
        return (
          <BarChart width={900} height={300} data={ topClientsGraph }
          margin = {{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#10a98b" />
          </BarChart>
        );
      }}
    </Query>
  );
}

export default PanelClients;