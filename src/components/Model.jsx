import React from "react";
function Model() {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop5"
      >
        Launch modal login form
      </button>

      <div
        className="modal top fade"
        id="staticBackdrop5"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-mdb-backdrop="true"
        data-mdb-keyboard="true"
      >
        <div className="modal-dialog modal-dialog-centered text-center d-flex justify-content-center">
          <div className="modal-content w-75">
            <div className="modal-body p-4">
              <img
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20%281%29.webp"
                alt="avatar"
                className="rounded-circle position-absolute top-0 start-50 translate-middle h-50"
              />
              <form>
                <div>
                  <h5 className="pt-5 my-3">Place Order</h5>

                  <div className="form-outline mb-4">
                    
                  <label className="form-label" htmlFor="address">
                      Address
                    </label>
                    <input
                      type="address"
                      id="address"
                      className="form-control"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="city"
                      id="city"
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="address">
                      city
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Model;
