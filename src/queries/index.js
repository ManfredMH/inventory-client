import gql from 'graphql-tag';

//Clients
export const CLIENTS_QUERY = gql`
  query getClients($limit: Int, $offset: Int, $seller: String){
    getClients(limit: $limit, offset: $offset, seller: $seller){
      id
      name
      lastname
      company
    }
    totalClients(seller: $seller)
  }
`;

export const CLIENT_QUERY = gql`
  query getClient($id: ID!){
    getClient(id: $id){
      id
      name
      lastname
      company
      age
      emails{
        email
      }
      type
    }
  }
`;

//Products
export const PRODUCTS_QUERY = gql`
  query getProducts($limit: Int, $offset:Int, $stock: Boolean){
    getProducts(limit: $limit, offset: $offset, stock: $stock){
      id
      name
      price
      stock
    }
    totalProducts
  }
`;

export const PRODUCT_QUERY = gql`
  query getProduct($id: ID!){
    getProduct(id: $id){
      id
      name
      price
      stock
    }
  }
`;

//Orders
export const ORDERS_QUERY = gql`
  query getOrders($client: ID){
    getOrders(client: $client){
      id
      total
      date
      status
      order{
        id
        quantity
      }
    }
  }
`;

//Graph
export const TOP_CLIENTS = gql`
  query topClients{
    topClients{
      total
      client{
        name
      }
    }
  }
`;

export const TOP_SELLERS = gql`
  query topSellers{
    topSellers{
      total
      seller{
        name
      }
    }
  }
`;

//Users
export const CURRENT_USER = gql`
  query getUser{
    getUser{
      id
      user
      name
      rol
    }
  }
`;