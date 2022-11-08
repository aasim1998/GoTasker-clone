export interface Client {
  id: number;
  name: string;
  full_name: string;
  personal_or_complete_name: string;
  internal_usage: boolean;
  email: string;
  address_one: string;
  address_two: string;
  city: string;
  state: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  zip_code: string;
  full_address: string;
  insurance?: any;
}
export interface ClientType {
  clients: Client[];
}
