export interface ResultsInvoice {
  count: number
  next: any
  previous: any
  results: Invoice[]
}

export interface Invoice {
  id: number
  department: string
  status: number
  status_name: string
  tax: number
  nro_control: any
  id_tfhk: any
  date_payment: string
  month: number
  cicle: number
  date_emission: string
  date_emission_tfhk: any
  observation: any
  date_expiration: string
  client: string
  id_client: number
  client_phone: string
  client_mobile: string
  contract: number
  charged: string
  amount: string
  coupon: number
  amount_discount: number
  amount_bs: AmountBs
  dollar_date: string
  dollar_rate: string
  iva_amount: string
  sub_total: string
  url: any
  invoice_third: any
  synchronization_third: boolean
  invoices_items_gsoft: InvoicesItemsGsoft[]
  created_by_name: string
}

export interface InvoicesItemsGsoft {
  id: number
  invoice: number
  service: number
  service_name: string
  details: string
  sum: number
  amount: string
  amount_bs: number
}
export interface AmountBs {
  amount: number
  sub_total: number
  iva_amount: number
}
export class InvoiceParams {
  search?: string
  page?: string
  contract?: string
}