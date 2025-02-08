import http from "../http-api";

class ProductService {
  getAll() {
    return http.get("/products");
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  create(data) {
    return http.post("/products", data);
  }

  findByTitle(name) {
    return http.get(`/products?name=${name}`);
  }
  // service update admin
  update(id, data) {
    return http.put(`/products/${id}`, data);
  }
  // service delete id
  delete(id) {
    return http.delete(`/products/${id}`);
  }
  // service delete all
  deleteAll() {
    return http.delete(`/products`);
  }
}
export default new ProductService();