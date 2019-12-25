import 'whatwg-fetch';

import { User, ServiceState, Channel, Question, Answer } from './models'

const jsonParsingError = {
  error: 'Parsing Error',
  message: 'Impossible to parse server`s response'
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestOptions {
  body?: {}
  headers?: HeadersInit
}

interface getResponse<T> {
  body: T;
}

class BasicHttpService {
  get = <T>(url: string, options?: object) => fetchJson<T>(url,  'GET', options)
  post = <T>(url: string, options?: object, body?: object) => fetchJson<T>(url, 'POST', { ...options, body })
  put = <T>(url: string, options?: object, body?: object) => fetchJson<T>(url, 'PUT', { ...options, body })
  delete = <T>(url: string, options?: object) => fetchJson<T>(url, 'DELETE', options)
}

export default class ChatService extends BasicHttpService {
  serviceUrl = 'http://localhost:3001'

  public loginUser = (userName: string) => this.post<ServiceState>(`${this.serviceUrl}/login`, {}, { name: userName, avatar: '^^' })

  public addUser = (user: User) => this.post<Array<User>>(`${this.serviceUrl}/user`, {}, user)

  public syncChannels = (channels: Array<Channel>) => this.put<Array<Channel>>(`${this.serviceUrl}/channels`, {}, channels)
}

async function fetchJson<T>(url: string, method: Method, options?: RequestOptions) {

  const jsonBody = (options && options.body) ? JSON.stringify(options.body) : undefined

  // tslint:disable:no-any
  const newOptions: any = {
    method,
    body: jsonBody,
    headers: {
      'content-type': 'application/json',
      'pragma': 'no-cache',
      'cache-control': 'no-cache'
    },
    credentials: 'include'
  }

  // tslint:disable:no-any
  const response = await fetch(encodeURI(url), newOptions)
  const value = await filterStatus(response)
  return value as T
}

async function filterStatus(response: Response) {  
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    try {
      const j = await response.json();
      return await Promise.reject(j);
    }
    catch (err) {
      return await Promise.reject(err instanceof Error ? jsonParsingError : err);
    }
  }
}