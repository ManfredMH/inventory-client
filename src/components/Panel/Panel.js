import React from 'react';
import PanelClients from './PanelClients';
import PanelSellers from './PanelSellers';

const Panel = () =>{
    return (
      <React.Fragment>
        <h1 className="text-center my-5">Top 10 Clients</h1>
        <PanelClients />
        <h1 className="text-center my-5">Top 10 Sellers</h1>
        <PanelSellers />
      </React.Fragment>
    );
}

export default Panel;