export interface TDK {
  title: string,
  keywords?: string,
  description?: string
}

export interface RpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export interface LanType {
  [key: string]: any
}

export type Res = 'success' | 'fail'