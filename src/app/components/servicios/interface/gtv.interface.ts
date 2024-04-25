export interface GtvRoot {
    result: Gtv
    status: Status
  }
  
  export interface Gtv {
    accountNumber: string
    userName: string
    pinCode: string
    firstName: string
    lastName: string
    email: string
    phone: string
    zipCode: string
    address: string
    city: string
    country: string
    state: string
    timeZone: string
    language: string
    password: string
    dateOfBirth: any
    expirationTime: string
    deviceCount: number
    activationCodes: ActivationCode[]
    devices: Device[]
    payments: Payment[]
    paymentStatus: string
    enabled: boolean
    deleted: boolean
    currentSubscriptionId: string
    currentSubscriptionStatus: CurrentSubscriptionStatus
  }
  
  export interface ActivationCode {
    activationCodeId: number
    expirationTime: string
    linkCode: string
  }
  
  export interface Device {
    serialNumber: string
    macAddress: string
    deviceOs: string
    deviceOsVersion: string
    appName: string
    appVersion: string
    ipAddress: string
    location: string
    name: any
    identifier: string
    role: string
    timezone: string
    status: string
    platform: string
  }
  
  export interface Payment {
    activeFrom: string
    activeUntil: string
    processDate: string
    purchasedContentAddOns: any[]
    deviceCount: number
    autoPay: boolean
    periodUnlimited: boolean
    trial: boolean
    totalAmount: number
    currencyCode: string
    subscriptionIdentifier: string
    subscriptionStatus: SubscriptionStatus
    paymentNumber: string
  }
  
  export interface SubscriptionStatus {
    status: string
    reason?: string
  }
  
  export interface CurrentSubscriptionStatus {
    status: string
    reason: any
  }
  
  export interface Status {
    code: string
    message: string
  }
  