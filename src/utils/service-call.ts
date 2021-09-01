import axios from 'axios';

export async function coinDcxServiceCall(
  method,
  endpoint,
  params = {},
  data = {}
) {
  try {
    return axios({
      method,
      url: `https://public.coindcx.com/${endpoint}`,
      data,
      params
    });
  } catch (err) {
    console.error(err);
  }
}
