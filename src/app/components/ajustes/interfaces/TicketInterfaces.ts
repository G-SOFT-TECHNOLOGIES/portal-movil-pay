export interface ResultTicket extends Array<never> {
    count: number
    next: any
    previous: any
    results: Ticket[]
  }
  
  export interface Ticket {
    id: number
    client: number
    client_name: string
    office: number
    office_name: string
    office_color: string
    office_create: number
    office_create_name: string
    office_create_color: string
    operator?: number
    operator_name?: string
    contract: number
    status: number
    status_name: string
    issue: number
    issue_name: string
    description: string
    closing_reason?: string
    visit_date: any
    date_closed?: string
    portal: boolean
    created_by: number
    created_by_name: string
    comment_count: number
    created_at: string
    updated_at: string
  }

  export interface ResultDetalleTicket {
    id: number
    client: Client
    office: Office
    operator: any
    operator_name: any
    nap_box: string
    contract: Contract
    status: number
    status_name: string
    issue: Issue
    description: string
    closing_reason: any
    visit_date: any
    date_closed: any
    portal: boolean
    created_by: number
    created_by_name: string
    created_at: string
    updated_at: string
    comments_tickets: any[]
    files_tickets: FilesTicket[]
  }
  
  export interface Client {
    id: number
    name: string
    last_name: string
    email: string
    identification: string
    phone: string
    mobile: string
  }
  
  export interface Office {
    id: number
    name: string
    email: string
    color: string
    issue: string
    serie: any
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
    contract_detail: ContractDetail[]
  }
  
  export interface ContractDetail {
    id: number
    contract: number
    service_type: ServiceType
    plan_type: PlanType
    status: number
    nodo: any
    nodo_name: any
    service_detail: any[]
    id_mw: any
    id_815: any
  }
  
  export interface ServiceType {
    id: number
    name: string
    description: string
  }
  
  export interface PlanType {
    id: number
    service_type: number
    name: string
    cost: string
  }
  
  export interface Issue {
    id: number
    name: string
    department: number
    department_name: string
    status: boolean
    created_by: number
    created_by_name: string
  }
  
  export interface FilesTicket {
    id: number
    ticket: number
    comment: any
    file: string
    extension: string
  }

  export interface TimeLine {
    id: number
    created_at: string
    updated_at: string
    deleted_at: any
    description: string
    closing_reason: any
    visit_date: any
    date_closed: any
    portal: boolean
    created_by: number
    updated_by: any
    deleted_by: any
    client: number
    office: number
    operator: any
    contract: number
    status: number
    issue: number
    history: History[]
  }
  
  export interface History {
    id: number
    history_change_reason: string
    history_date: string
    created_at: string
    updated_at: string
    deleted_at: any
    description: string
    closing_reason: any
    visit_date: any
    date_closed: any
    portal: boolean
    created_by: number
    updated_by: any
    deleted_by: any
    client: number
    office: number
    operator: any
    contract: number
    status: number
    issue: number
  }