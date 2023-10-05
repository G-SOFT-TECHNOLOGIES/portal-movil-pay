export interface ResultsLogin {
    token: string
    client: Client
    message: string
  }
  
  export interface Client {
    id: number
    name: string
    last_name: string
    identification: string
    email: string
  }
  