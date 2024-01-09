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
  nro_control?: string
  date_payment: string
  month: number
  cicle: number
  date_emission: string
  observation?: string
  date_expiration: string
  client: string
  contract: number
  charged: string
  amount: string
  iva_amount: number
  sub_total: string
  url?: string
  invoices_items_gsoft: InvoicesItemsGsoft[]
  created_by_name: string
  amount_discount:any
}

export interface InvoicesItemsGsoft {
  id: number
  invoice: number
  service: number
  service_name: string
  details: string
  sum: number
  amount: string
}

export class InvoiceParams {
  search?: string
  page?: string
  contract?: string
}