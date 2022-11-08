export interface InsuranceFile {
  url: string;
}

export interface OtherFile {
  url: string;
}

export interface Insurance {
  id: number;
  user_id?: any;
  organization_id: number;
  pa_insure: string;
  ga: string;
  certificate_holder?: any;
  addl: boolean;
  wcel: boolean;
  insurance: boolean;
  role: string;
  owner_org_id: number;
  insurance_file: InsuranceFile;
  insurance_url: string;
  start_date: Date;
  end_date: Date;
  vaild_insurance: boolean;
  remaining_days: number;
  other_file: OtherFile;
  other_file_url: string;
  correct_certificate_holder: boolean;
  ga_check: boolean;
  pa_insure_check: boolean;
}

export interface OrganizationList {
  id: number;
  email: string;
  slug: string;
  name: string;
  phone_no: string;
  website_url: string;
  address_one: string;
  address_two: string;
  state: string;
  city: string;
  zip_code: string;
  logo: string;
  address: string;
  insurance: Insurance;
}

export interface OrganizationType {
  organization_list: OrganizationList[];
}
