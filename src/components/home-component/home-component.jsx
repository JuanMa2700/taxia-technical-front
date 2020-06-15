import React, { Component } from "react";
import { default as http } from "../../services/http-service";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      page: 1,
      totalPages: 1,
    };
    this.changePage = this.changePage.bind(this);
  }
  async componentDidMount() {
    const query = await http.get("/products");
    this.setState({ products: query.data });
    this.setState({ totalPages: query.lastPage });
  }

  render() {
    const products = this.state.products;
    const productCards = products.map((product, index) => (
      <div key={index} className="col-md-3 m-3">
        <div className="card">
          <img
            className="card-img-top"
            style={{ borderRadius: "30px 30px 0px 0px" }}
            src={product.image_url}
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <h6>${product.price}</h6>
            <a style={{ color: "blue" }} href={"/purchase/" + product.id}>
              BUY
            </a>
          </div>
        </div>
      </div>
    ));

    const pages = [];
    for (let i = 1; i <= this.state.totalPages; i++) {
      pages.push(
        <li key={i} className="page-item">
          <button
            className="page-link"
            onClick={() => this.changePage(i, pages)}
          >
            {i}
          </button>
        </li>
      );
    }

    if (pages[this.state.page - 1]) {
      pages[this.state.page - 1] = (
        <li key={this.state.page} className="page-item active">
          <button className="page-link">{this.state.page}</button>
        </li>
      );
    }

    return (
      <div className="row justify-content-center align-items-center">
        <div className="col-12">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center align-items-center m-2">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => this.changePage(this.state.page - 1, pages)}
                >
                  Previous
                </button>
              </li>
              {pages}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => this.changePage(this.state.page + 1, pages)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {productCards}
      </div>
    );
  }

  async changePage(page, pages) {
    if (page < 1) page = this.state.totalPages;
    if (page > this.state.totalPages) page = 1;
    this.setState({ page });
    const query = await http.get("/products?page=" + page);
    this.setState({ products: query.data });
  }
}

export default Home;
