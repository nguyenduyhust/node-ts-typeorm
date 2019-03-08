export type IAPIResponse = {
  code: number;
  status: 'error' | 'success';
  data: any;
};