export interface RootCanjes {
    count: number
    next: any
    previous: any
    results: ResultCanjes[]
  }
  
  export interface ResultCanjes {
    id: number
    code: string
    expires_at: string
    uses: number
    description: string
    uses_left: number
    percentage: string
    client: number
    client_name: string
    service: number
    service_name: string
    campaign: any
  }