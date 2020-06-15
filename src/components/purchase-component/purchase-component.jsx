import React, { Component } from "react";
import { default as http } from "../../services/http-service";
import MapComponent from "../map-component";

class PurchaseComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: 0,
        name: "",
        description: "",
        price: 0,
        image_url: "",
        stock: 0,
      },
      currentLocation: { lat: 0, lng: 0 },
      success: false,
      error: false,
      purchase: {},
    };
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        });
      });
    }
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct = async () => {
    const product = await http.get(
      "/product?product_id=" + this.props.match.params.id
    );
    this.setState({ product });
  };

  manageLocChange = async (evt) => {
    console.log(evt.lat, evt.lng);
    this.setState({ currentLocation: { lat: evt.lat, lng: evt.lng } });
  };

  makePurchase = async () => {
    console.log(this.state.currentLocation);
    try {
      const purchase = await http.post("/make-purchase", {
        product_id: this.state.product.id,
        longitude: this.state.currentLocation.lat.toFixed(6),
        latitude: this.state.currentLocation.lng.toFixed(6),
      });
      console.log(purchase);
      this.setState({ purchase });
      this.setState({ success: true });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-3 m-3">
          <img
            className="card-img-top"
            style={{ borderRadius: "30px" }}
            src={this.state.product.image_url}
            alt=""
          />
          {this.state.success && (
            <div className="alert alert-success m-2" role="alert">
              <h4 className="alert-heading">Successfull Purchase:</h4> <br />
              {this.state.product.name} <br />
              {this.state.purchase.transaction_date} <br />
              {this.state.purchase.address}
            </div>
          )}
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <h5 className="card-title">{this.state.product.name}</h5>
            <h6 className="card-title">Description</h6>
            <p>{this.state.product.description}</p>
            <h6>Available units</h6>
            <p>{this.state.product.stock}</p>
            <h3>${this.state.product.price}</h3>
            <button className="btn btn-primary" onClick={this.makePurchase}>
              <i className="fa fa-shopping-cart"></i> Make Purchase
            </button>
          </div>
        </div>
        <div className="col-md-5 m-3">
          <h6>Delivery Location</h6>
          <MapComponent
            location={this.state.currentLocation}
            locChange={this.manageLocChange}
          />
        </div>
      </div>
    );
  }
}

export default PurchaseComponent;
