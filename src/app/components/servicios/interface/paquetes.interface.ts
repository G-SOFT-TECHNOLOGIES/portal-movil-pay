export type getAllPackages = Packages[]

export interface Packages {
  id: number
  name: string
  detail: string
  price: string
  file_logo: any
  status: boolean
}

export type IdPAck = PackegeID[]

export interface PackegeID {
  id: number
  package: Package
  channel: Channel
}

export interface Package {
  id: number
  name: string
  detail: string
  price: string
  file_logo: any
  status: boolean
  channels_package_gtv_count:number
  active?:boolean
}

export interface Channel {
  id: number
  name: string
  file_logo: string
}