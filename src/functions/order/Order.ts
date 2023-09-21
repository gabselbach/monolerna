import { Schema, model } from 'mongoose'
export enum OperationTypeEnum {
  NORMAL = 'Normal',
  DROPSHIPPING = 'Dropshipping'
}
export interface Numeration {
  serie: number
  lastNumber?: number
}
export interface Certificate {
  value: string
  password: string
}
export interface InvoiceParameters {
  issuerCode: string
  numeration: Numeration
  certificate?: Certificate
  expiryTime?: number
}
export interface Company {
id: string
cnpj: string
name: string
invoiceParameters?: InvoiceParameters
}
export interface CompanyWithOperationType extends Company {
operationType: OperationTypeEnum
}

const CompanySchema = new Schema<Company>(
  {
    id: { type: String, required: true },
    cnpj: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
)

export interface Address {
  street: string
  number: string
  complement?: string
  zipCode: string
  neighborhood: string
  city: string
  cityCode?: string | null
  state: string
  country: string
}

export interface Customer {
  name: string
  phone: string
  email: string
  document: string
  ie?: string
  isTaxpayer?: boolean
  typePerson: string
  address: Address
  deliveryAddress: Address
  billingAddress: Address
}

export interface Order {
  id?: string
  client?: Company
  customer: Customer
  code: string
  amount: number
  discount: number
  freight: number
  totalVolumes?: number
  isManual?: boolean
  additionalInformation?: string
  createdAt?: Date
  updatedAt?: Date
}

const AddressSchema = new Schema<Address>(
  {
    street: { type: String, required: true },
    number: { type: String, required: true },
    complement: { type: String, default: null },
    zipCode: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    cityCode: { type: String, required: false, default: null },
    state: { type: String, required: true },
    country: { type: String, required: true }
  },
  { _id: false }
)

export const CustomerSchema = new Schema<Customer>(
  {
    name: { type: String, required: true },
    phone: { type: String, default: '' },
    email: { type: String, required: true },
    document: { type: String, required: true },
    ie: { type: String, default: null },
    isTaxpayer: { type: Boolean, default: false },
    typePerson: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    deliveryAddress: { type: AddressSchema, required: true },
    billingAddress: { type: AddressSchema, required: true }
  },
  { _id: false }
)

const OrderSchema = new Schema<Order>(
  {
    client: { type: CompanySchema, required: false },
    customer: { type: CustomerSchema, required: true },
    code: { type: String, required: true },
    amount: { type: Number, required: true },
    discount: { type: Number, required: true },
    freight: { type: Number, required: true },
    totalVolumes: { type: Number, default: 0 },
    additionalInformation: { type: String, required: false },
    isManual: { type: Boolean, required: false }
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
)

// TODO: Pensar melhor em como tratar o index, vamos temporarialmente travar pra não deixar duplicar
OrderSchema.index({ code: 1 }, { unique: true })

export const OrderModel = model<Order>('Order', OrderSchema)
