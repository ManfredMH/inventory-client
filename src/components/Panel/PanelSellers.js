import React from 'react';
import { Query } from 'react-apollo';
import { TOP_SELLERS } from '../../queries';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const PanelSellers = () => {
  return (
    <Query query={TOP_SELLERS}>
      {({ loading, err, data }) => {
        if (loading) return 'Loading...';
        if (err) return `Error ${err.message}`;
        const topSellersGraph = [];
        data.topSellers.map((seller, index) => {
          return topSellersGraph[index] = {
            ...seller.seller[0],
            total: seller.total
          };
        });
        return (
          <BarChart width={900} height={300} data={topSellersGraph}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#6148b9" />
          </BarChart>
        );
      }}
    </Query>
  );
}

export default PanelSellers;