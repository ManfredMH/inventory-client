import React,{Component} from 'react';

export default class Pager extends Component {

  state = {
    pager: {
      pages: Math.ceil(Number(this.props.total) / this.props.limit)
    }
  }

  render() {
    const { current } = this.props;
    const btnPrevious = (current > 1) ? <button onClick={this.props.previousPage} type="button" className="btn btn-success mr-2">&laquo;</button> : '';
    const { pages } = this.state.pager;
    const btnNext = (current !== pages) ? <button onClick={this.props.nextPage} type="button" className="btn btn-success ml-2">&raquo;</button> : '';
    
        return (
          <div className="mt-5 d-flex justify-content-center">
            {btnPrevious}
            {btnNext}
          </div>
        );
    }
}