import axios from "axios";
const BaseUrlV1 = "http://185.126.200.70:4241/api/v1";
const Auth = "/auth";
const Admin = "/admin";
const Food = "/food";

class Services {
  async login(token, lang, request) {
    return await axios.post(`${BaseUrlV1}${Auth}/login`, request, {
      headers: { "accept-language": lang },
    });
  }
  async listFoods(token, lang, request, query) {
    return await axios.get(`${BaseUrlV1}${Admin}${Food}${query || ""}`, {
      headers: {
        Authorization: "bearer " + token,
        "accept-language": lang,
      },
    });
  }
  async deleteFoods(token, lang, request) {
    return await axios.post(`${BaseUrlV1}${Admin}${Food}/delete`, request, {
      headers: {
        Authorization: "bearer " + token,
        "accept-language": lang,
      },
    });
  }
  async dashboard(token, lang) {
    return await axios.get(`${BaseUrlV1}${Admin}/dashboard`, {
      headers: {
        Authorization: "bearer " + token,
        "accept-language": lang,
      },
    });
  }
  async checkToken(token, lang) {
    return await axios.get(`${BaseUrlV1}${Admin}/check-token`, {
      headers: {
        Authorization: "bearer " + token,
        "accept-language": lang,
      },
    });
  }
}
export default new Services();
