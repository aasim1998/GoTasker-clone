export type loginScreen = {email: string; password: string; deviceId: string};
export interface AuthResponse {
  data: userDataType;
}
export interface InsuranceType {
  addl: boolean;
  certificate_holder: string;
  correct_certificate_holder: boolean;
  end_date: number;
  ga: number;
  ga_check: boolean;
  id: number;
  insurance: boolean;
  insurance_file: {
    url: string;
  };
  insurance_url: string;
  organization_id: number;
  other_file: {
    url: string;
  };
  other_file_url: string;
  owner_org_id: number;
  pa_insure: number;
  pa_insure_check: boolean;
  remaining_days: number;
  role: string;
  start_date: number;
  user_id: number;
  vaild_insurance: boolean;
  wcel: boolean;
}
export interface userDataType {
  address_one: string;
  address_two: string;
  admin: boolean;
  categories: any;
  city: string;
  confirmed: boolean;
  email: string;
  email_notifications_enabled: boolean;
  first_name: string;
  full_name: string;
  id: number;
  image_url: string;
  insurance: InsuranceType;
  is_financier: boolean;
  is_subscribed: {
    code: number;
    message: string;
  };
  jwt_token: string;
  last_name: string;
  organization_user_id: string;
  payment_detail: any;
  personal_or_complete_name: string;
  phone_number: string;
  product_tour: boolean;
  profile_tour: boolean;
  project_tour: boolean;
  push_notifications_enabled: boolean;
  role_list: {
    organization_id: number;
    role: string;
  };
  sms_notifications_enabled: boolean;
  state: string;
  tos_accepted: boolean;
  zip_code: number;
}
