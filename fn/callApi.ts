import axios from 'axios';

export const callApi = async (url: string, method: string, data?: any) => {
  try {
    const res = await axios({
      method,
      url,
      data,
    });
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