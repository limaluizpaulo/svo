import { useState } from "react";
import { Link } from "react-router-dom";

export default function EditProduct() {
  return (
    <div className="mx-5 px-5">
      <h2 className="my-5">Edit Product (Under Development)</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Store Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categorySelect" className="form-label">
            Mask Category
          </label>
          <select
            id="categorySelect"
            className="form-select"
            aria-label="Default select example"
          >
            <option selected>Selected Here</option>
            <option value="1">Barong</option>
            <option value="2">Dalem</option>
            <option value="3">Keras</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="formStock" className="form-label">
            Stock
          </label>
          <input type="number" className="form-control" id="formStock" />
        </div>
        <div className="mb-3">
          <label htmlFor="formPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            accept="jpg"
            className="form-control"
            id="formPrice"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Product Image
          </label>
          <input type="file" className="form-control" id="formFile" />
        </div>
        <div className="mb-5">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
          ></textarea>
        </div>
        <div className="d-flex justify-content-end">
          <Link to={"/product"}>
            <button className="btn btn-light mb-5 me-2">Back</button>
          </Link>
          <button className="btn btn-primary mb-5">Edit Product</button>
        </div>
      </form>
    </div>
  );
}
