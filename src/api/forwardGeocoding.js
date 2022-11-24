import axios from "axios";

async function coor_add(address) {
  const res = await axios.get(
    "https://api.opencagedata.com/geocode/v1/json? ",
    {
      params: {
        key:"71b85cdcb3ad46249bb210689549763b",
        q: address,
        language: "en"
      }
    }
  );
  return res;
}

export default coor_add;
