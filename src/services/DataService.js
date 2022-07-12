import http from "../http-common";
// import axios from "axios";
// const searchFromApi = async (query) => {
//   return axios.get("/api/search", {
//     params: query,
//   })
// }


class DataService {
  async getAllSampleMetadata() {
    return http.get("/samples_metadata");
  }
  async getExpressionData(hi=1000, lo=500, limit) {
    //http://127.0.0.1:8000/expression_data_by_gene_expression/50000?limit=5
    return http.get(`/expression_data/${limit}?hi=${hi}&lo=${lo}`)
  }
  // getAllSampleMetadata = async () => {
  //   return axios.get("/samples_metadata");
  // }
  /*
  get(id) {
    return http.get(`/tutorials/${id}`);
  }
  create(data) {
    return http.post("/tutorials", data);
  }
  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }
  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }
  deleteAll() {
    return http.delete(`/tutorials`);
  }
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
  */
}
export default new DataService();