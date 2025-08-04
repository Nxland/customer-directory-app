<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'company_name' => $this->CompanyName,
            'description' => $this->Description,
            'website' => $this->Email, // vamos assumir que é isso
            'subscription_cost' => (float) ($this->subscription->Cost ?? 0),
            'billing_period' => strtolower($this->subscription->BillingPeriod ?? ''),
            'address' => implode("\n", array_filter([
                $this->address->StreetAddress ?? null,
                'Suite 1200', // hardcoded conforme mockup
                ($this->address->City ?? '') . ', ' .
                ($this->address->StateProvince ?? '') . ' ' .
                ($this->address->PostalCode ?? '')
            ]))
        ];
    }
}
