import { getField } from '@/lib/local-storage';
import axios, { AxiosRequestConfig } from 'axios';

axios.interceptors.request.use(config => {
  config.headers.authorization = `Bearer ${getField('access-token')}`;

  return config;
});

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

class HttpRequest {
  private server: string;
  private headers: Record<string, unknown>;

  constructor(server: string, headers: Record<string, unknown> = {}) {
    this.server = server;
    this.headers = headers;
  }

  get<T>(
    path: string | string[],
    data: AxiosRequestConfig['data'] = {},
    headers: AxiosRequestConfig['headers'] = {},
  ) {
    return this.request<T>(HttpMethod.GET, path, data, headers);
  }

  post<T>(
    path: string | string[],
    data: AxiosRequestConfig['data'] = {},
    headers: AxiosRequestConfig['headers'] = {},
  ) {
    return this.request<T>(HttpMethod.POST, path, data, headers);
  }

  put<T>(
    path: string | string[],
    data: AxiosRequestConfig['data'] = {},
    headers: AxiosRequestConfig['headers'] = {},
  ) {
    return this.request<T>(HttpMethod.PUT, path, data, headers);
  }

  patch<T>(
    path: string | string[],
    data: AxiosRequestConfig['data'] = {},
    headers: AxiosRequestConfig['headers'] = {},
  ) {
    return this.request<T>(HttpMethod.PATCH, path, data, headers);
  }

  delete<T>(
    path: string | string[],
    data: AxiosRequestConfig['data'] = {},
    headers: AxiosRequestConfig['headers'] = {},
  ) {
    return this.request<T>(HttpMethod.DELETE, path, data, headers);
  }

  private request<T>(
    method: HttpMethod = HttpMethod.GET,
    path: string | string[],
    data: AxiosRequestConfig['data'],
    headers: AxiosRequestConfig['headers'],
  ): Promise<T> {
    const requestConfig: AxiosRequestConfig = {
      url: [this.server].concat(path).join('/'),
      method,
      headers: {
        ...this.headers,
        'Content-type': 'application/json',
        ...headers,
      },
    };

    if (method === HttpMethod.GET) {
      requestConfig.params = data;
    } else {
      requestConfig.data = data;
    }

    return axios(requestConfig).then(res => res.data);
  }
}

export const apiService = new HttpRequest(
  process.env.NEXT_PUBLIC_API_ENDPOINT!,
);
