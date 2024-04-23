export type ServicesType = []

export interface ServicesTV {
  id: number
  plan: any
  service_type: number
  name: string
  description: string
  cost: string
  profile: string
  mk: string
  image: any
  profit_id: any
  status: boolean
  channel_count:number
}

export interface PlanID {
  id: number
  plan: any
  service_type: number
  name: string
  description: string
  cost: string
  profile: string
  mk: string
  image: any
  profit_id: any
  status: boolean
  channels_plan_gtv: ChannelsPlanGtv[]
}

export interface ChannelsPlanGtv {
  id: number
  plan: number
  plan_name: string
  channel: Channel
}

export interface Channel {
  id: number
  name: string
  file_logo?: string
}

