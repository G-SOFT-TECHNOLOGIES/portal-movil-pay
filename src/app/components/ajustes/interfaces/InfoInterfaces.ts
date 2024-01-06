export interface ResultInfo {
    count: number
    next: any
    previous: any
    results: Informacion[]
  }
  
  export interface Informacion {
    id: number
    sender: string
    name: string
    email: any
    method: number
    method_name: string
    client: number
    created_at: string
    created_by: number
    created_by_name: string
    status:string
  }
  