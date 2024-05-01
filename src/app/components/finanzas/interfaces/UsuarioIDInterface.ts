export interface ContratoID {
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
  signe_base64: any
  signe: any
  order_id: number
  finish_installation: string
  synchronization_third: boolean
  status: number
  balance: number
  debt: number
  sector_name: string
  parish_name: string
  plan_name_internet: string
  pts: string
  latitude: string
  longitude: string
  date_cicle: number
  change_cicle: any
  invoice_date_cicle: any
  status_name: string
  address: string
  address_tax: string
  client_name_name: string
  client_name_lastname: string
  bank_associated: BankAssociated
  sft_detail: any
  created_by_name: string
  created_at: string
  contract_detail: ContractDetail[]
}

export interface BankAssociated {
  id: number
  bank: number
  bank_name: string
  nro_cta: string
  tlf: string
  status: boolean
}

export interface ContractDetail {
  id: number
  contract: number
  service_type: ServiceType
  plan_type: PlanType
  plan_type_corpor: any
  status: number
  nodo: number
  nodo_name: string
  service_detail: ServiceDetail[]
  id_mw: string
  id_mwm: any
  id_815: any
  contract_detail_package_count: number
  contract_detail_product: any[]
  contract_detail_account: any
}

export interface ServiceType {
  id: number
  name: string
  description: string
}

export interface PlanType {
  id: number
  plan: number
  service_type: number
  name: string
  description: string
  cost: string
  profile: string
  mk: string
  channel_count: number
  package_count: number
  image: string
  profit_id: string
  status: boolean
  airport: boolean
}

export interface ServiceDetail {
  id: number
  ip: string
  redIPV4: string
  ppuser: string
  pppassw: string
  nap_port: string
  nap_id: any
  mac: string
  smart_olt: any
  serial: string
}


export interface ContractDetailPackage {
  id: number
  package: number
  package_name: string
  package_price?:string
  contract_detail: number
  date_end: string
  finish_date?: any
  created_by: number
}