export interface Customer {
    CustomerID: number;
    CompanyName: string;
    Description?: string;
  }
  
  export interface CustomerDetail {
    company_name: string;
    description: string;
    website: string;
    subscription_cost: number;
    billing_period: string;
    address: string;
  }