import axios from 'axios';

export async function coinDcxServiceCall(
  method,
  endpoint,
  params = {},
  data = {}
): Promise<any> {
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

export async function binanceServiceCall(
  method,
  endpoint,
  params = {},
  data = {}
): Promise<any> {
  try {
    return axios({
      method,
      url: `https://api.binance.com/api/v3/${endpoint}`,
      data,
      params
    });
  } catch (err) {
    console.error(err);
  }
}
