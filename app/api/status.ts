interface Status {
  status: number;
  msg: object | string;
  data: any;
}

export const api_status = ({status, msg, data} : Status) => {
  return {status, msg, data}
}