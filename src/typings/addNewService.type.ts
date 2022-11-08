export type AddNewServiceProps = {
  id: number;
  description: string;
  name: string;
  created_at: string;
  client_id: number;
  status: string;
  created_by_role: string;
  organization_id: number;
  organization_name: string;
  internal: boolean;
  project_tour: boolean;
  role_in_project: string;
  client: Client;
};

export type Client = {
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
  insurance: null;
  time_zone: string;
  email_notifications_enabled: boolean;
  sms_notifications_enabled: boolean;
  product_tour: boolean;
  profile_tour: boolean;
};
