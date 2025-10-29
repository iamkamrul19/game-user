import axios from "axios";
const IP_API_KEY = process.env.IP_API_KEY as string;
export const getIPAddress = async () => {
  try {
    const IP_URL = `https://api.whatismyip.com/ip.php?key=${IP_API_KEY}`;
    const res = await axios.get(IP_URL);
    if (res?.data?.ip_address) {
      return { ip: res.data.ip_address };
    } else {
      return { ip: null };
    }
  } catch (error) {
    console.log("IP error", error);
    return { ip: null };
  }
};

// export const getIPWiseInfo = async (ip: string) => {
//   try {
//     const url = `http://ip-api.com/json/`;
//     const res = await axios.get(url);
//     console.log("res", res);
//   } catch (error) {
//     console.log("IP WISE error", error);
//     return null;
//   }
// };
