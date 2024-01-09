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

  export interface Alerts{
    code: string
    menu_patch:string
  }
  