export interface ResultInfo {
    count: number
    next: any
    previous: any
    results: Informacion[]
  }
  
  export interface Informacion {
    id: number
    phone?: string
    name: string
    email?: string
    method: string
    client: number
    created_at: string
    created_by: any
    created_by_name: any
  }
  