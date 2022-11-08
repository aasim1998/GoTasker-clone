export type PendingActionProps = {
  id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
  referenceable_type: string;
  category: string;
  type: string;
  notice_created_by_user: string;
  notice_display_name: string;
  notice_client_display_name: null;
  notice_title: string;
  notice_message: null;
  role: string;
  project: Project;
  referenceable: Referencable;
};
export type Project = {
  id: number;
  name: string;
  description: string;
  client: Client;
  role_in_project: string;
};

export type Client = {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  encrypted_password: string;
  confirmation_token: string;
  remember_token: string;
  admin: boolean;
  name: string;
  calendar_token: string;
  phone_number: number;
  address_one: string;
  address_two: string;
  city: string;
  zip_code: string;
  state: string;
  time_zone: string;
  stripe_customer_id: null;
  tos_accepted: boolean;
  email_notifications_enabled: boolean;
  sms_notifications_enabled: boolean;
  country_code: number;
  confirmed: boolean;
  first_name: string;
  last_name: string;
  enabled: boolean;
  avatar: avtar;
  avatar_content_type: null;
  avatar_file_size: null;
  avatar_updated_at: null;
  jwt_token: string;
  string: null;
  unpaid_invoice_id: null;
  unsubscribe_approval: boolean;
  unsubscription_email: boolean;
  push_notifications_enabled: true;
  promocode: string;
  promotion_count: number;
  internal_usage: false;
  login_count: number;
  last_login_at: string;
  logout_at: string;
  product_tour: boolean;
  profile_tour: boolean;
  project_tour: boolean;
};

export type avtar = {
  url: null;
};
export type Referencable = {
  id: number;
  project_id: number;
  description: string;
  visit_type: string;
  delayed_time: string;
  job_completed: true;
  status: string;
  current_user_status: string;
};
