import React,{Component} from 'react';

export default class Product extends Component {
  state = {

  }
  render() {
    const { product } = this.props;
        return (
          <React.Fragment>
            <tr>
              <td>{product.name}</td>
              <td>$ {product.price}</td>
              <td>{product.stock}</td>
              <td>
                <input type="number"
                  min="1"
                  className="form-control"
                  onChange={e => {
                    if (e.target.value > product.stock) {
                      e.target.value = 0;
                    }
                    this.props.handleQuantity(e.target.value, this.props.index);
                  }} />
              </td>
              <td>
                <button type="button"
                  className="btn btn-danger font-weight-bold"
                  onClick={e => this.props.deleteProduct(product.id)}
                >&times;</button>
              </td>
            </tr>
          </React.Fragment>
        );
    }
}