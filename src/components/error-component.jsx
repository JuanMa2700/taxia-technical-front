import React from "react";

function ErrorComponent(props) {
  return (
    <div className="row justify-content-center align-items-center p-5">
      <div className="col-md-4">
        <div className="card">
          <img
            className="card-img-top"
            style={{ borderRadius: "30px 30px 0px 0px" }}
            src="/not-found.png"
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title">Not Found</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorComponent;
