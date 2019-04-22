import gql from 'graphql-tag';

//CLIENTS
export const NEW_CLIENT = gql`
  mutation createClient($input: ClientInput){
    createClient(input: $input){
      id
      name
      lastname
    }
}`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($input: ClientInput){
    updateClient(input: $input){
      id
      name
      lastname
      company
      age
      type
      emails{
        email
      }
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!){
    deleteClient(id: $id)
  }
`;

//PRODUCTS
export const ADD_PRODUCT = gql`
  mutation createProduct($input: ProductInput){
    createProduct(input: $input){
      name
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!){
    deleteProduct(id: $id)
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: ProductInput){
    updateProduct(input: $input){
      id
      name
      price
      stock
    }
  }
`;

//ORDERS
export const ADD_ORDER = gql`
  mutation addOrder($input: OrderInput){
    addOrder(input: $input){
      id
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation updateStatus($input: OrderInput){
    updateStatus(input: $input)
  }
`;

//USERS
export const ADD_USER = gql`
  mutation createUser($user: String!, $name:String!, $password: String!, $rol: String!){
    createUser(user: $user, name: $name, password: $password, rol: $rol)
  }
`;

export const LOGIN_USER = gql`
  mutation authenticatedUser($user: String!, $password: String!){
    authenticatedUser(user: $user, password: $password){
      token
    }
  }
`;