export interface ResultContract {
  count: number
  next: any
  previous: any
  results: Contract[]
}

export interface Contract {
  id: number
  client: number
  client_name: string
  client_email: string
  identification: string
  client_type: number
  client_type_name: string
  client_phone: string
  client_mobile: string
  installation_order: string
  signe: any
  order_id: number
  finish_installation: string
  synchronization_third: boolean
  status: number
  balance: number
  debt: number
  pts: number
  latitude: string
  longitude: string
  date_cicle: number
  status_name: string
  address: string
  address_tax: string
  client_name_name: string
  client_name_lastname: string
  bank_associated: number
}

export class ParamsCampaing {
  search?: string
  page?: number

}
export class ParamsGTV {
  status?: string
  gtv_package_active?:string
}