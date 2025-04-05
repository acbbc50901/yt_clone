import axios from 'axios';
import { isTokenExpired } from './isTokenExpired';
export const callApi = async (url: string, method: string, data?: any, authRequired? : boolean) => {
  try {
    let res;
    if (authRequired) { 
      let accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return { message: 'No access token found' };
      }
      if (isTokenExpired(accessToken)) {
        // Handle token expiration
        console.log("Token expired");
        const refreshRes = await callApi("api/auth/refresh", "POST");
        if (refreshRes.status !== 200) {
          console.log('都過期了');
          return { message: 'Refresh token expired' };
        }
        const newAccessToken : string = refreshRes.data.accessToken; 
        localStorage.setItem('accessToken', newAccessToken);
        accessToken = newAccessToken;
      }
      res = await axios({
        method,
        url,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      });
    } else {
      res = await axios({
        method,
        url,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

    }
    console.log("axiso ==> ", res);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data);
      return error.response.data;
    } else {
      console.log(error);
      return { message: 'An unknown error occurred' };
    }
  }
}