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
    finish_installation: any
    status: number
    balance: number
    debt: number
    date_cicle: number
    status_name: string
    address: string
    address_tax: string
  }
  