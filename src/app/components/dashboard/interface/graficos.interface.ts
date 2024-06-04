export class ConsumoParams {
  date?: any;
  group?: string;
  last_period?: any;
  month?: string;
  since?: string;
  until?: string;
  year?: string;
}

export interface IConsumo {
  date__year:  number;
  date__month: number;
  download:    number;
  upload:      number;
}

export interface IServiceDetail {
  id: number;
  ip: string;
  ip_corte?: null;
  redIPV4: string;
  ppuser: string;
  pppassw: string;
  nap_port: string;
  nap_id: number;
  mac: string;
  smart_olt: null;
  serial: string;
}
