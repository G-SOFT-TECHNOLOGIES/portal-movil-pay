export interface ResultClients {
    count: number
    next: any
    previous: any
    results: Clients[]
  }
  
  export interface Clients {
    id: number
    name: string
    last_name: string
    email: string
    identification: string
    phone: string
    mobile: string
  }
  