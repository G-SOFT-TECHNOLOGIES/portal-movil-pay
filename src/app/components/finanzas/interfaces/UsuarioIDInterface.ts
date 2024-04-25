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
  finish_installation: string
  status: number
  balance: number
  debt: number
  date_cicle: number
  status_name: string
  address: string
  address_tax: string
  bank_associated: BankAssociated
  contract_detail: ContractDetail[]
}

export interface ContractDetail {
  id: number
  contract: number
  service_type: ServiceType
  plan_type: PlanType
  contract_detail_package_count: number
  contract_detail_product: ContractDetailProduct[]
  status: number
  nodo: number
  service_detail: ServiceDetail[]
  id_mw: string
  id_815: any
}

export interface ServiceType {
  id: number
  name: string
  description: string
}
export interface BankAssociated {
  id: number
  bank: number
  bank_name: string
  nro_cta: string
  tlf: string
  status: boolean
}
export interface ContractDetailPackage {
  id: number
  package: number
  package_name: string
  package_file_logo: any
  package_price: number
  date_end: any
  created_by: number
  created_by_name: string
  active?:boolean
  finish_date?:any
}

export interface ContractDetailProduct {
  id: number
  product: number 
  product_name: string
  serial: any
  mac: any
  created_by: number
  created_by_name: string
}
export interface PlanType {
  id: number
  service_type: number
  name: string
  cost: string
}

export interface ServiceDetail {
  id: number
  ip: string
  redIPV4: string
  ppuser: string
  pppassw: string
  nap_port: string
  nap_id: string
  mac: string
  smart_olt: string
  serial: string
}
