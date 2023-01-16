import { FormEvent, useEffect, useState } from "react";
import api from "../../api/server";
import { useNavigate } from "react-router-dom";

interface Category {
  tags: string;
  name: string;
  id: string;
}

interface CategoryData {
  meta: any;
  data: Category[];
}

export default function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  async function getCategory() {
    const result: CategoryData = await api("/categories?page=1&limit=6");
    setCategoryList(result.data);
  }
  useEffect(() => {
    getCategory();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (image && name && category && stock && price && description) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("categoryId", category);
        formData.append("storeId", localStorage.getItem("id")!);
        formData.append("stock", String(stock));
        formData.append("price", String(price));
        formData.append("image", image);
        formData.append("desc", description);

        const result = await api("/products", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")!}`,
          },
        });
        alert("Success add product");
        navigate("/product");
      }
    } catch (e: any) {
      console.log(e.response._data);
    }
  }

  return (
    <div className="mx-5 px-5">
      <h2 className="my-5">Add Product</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Store Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option defaultValue={""}>Selected Here</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="formStock" className="form-label">
            Stock
          </label>
          <input
            type="text"
            className="form-control"
            id="formStock"
            value={stock}
            onChange={(e) =>
              setStock(Number(e.target.value) ? Number(e.target.value) : 0)
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formPrice" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="formPrice"
            value={price}
            onChange={(e) =>
              setPrice(Number(e.target.value) ? Number(e.target.value) : 0)
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Product Image
          </label>
          <input
            type="file"
            accept="image/jpeg"
            className="form-control"
            id="formFile"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary mb-5">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
