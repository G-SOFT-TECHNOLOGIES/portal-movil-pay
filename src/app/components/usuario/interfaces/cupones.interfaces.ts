export interface CampaignRoot {
    count: number
    next: any
    previous: any
    results: Campaign[]
}

export interface Campaign {
    id: number
    name: string
    description: string
    status: boolean
    pts: number
    portal_available: boolean
    file: string
    client_type: number
    client_type_name: string
    expires_at: string
    percentage: string
    created_at: string
    created_by: number
    coupons_count: number
}
