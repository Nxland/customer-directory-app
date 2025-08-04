<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $query = Customer::query();

        if ($search = $request->query('query')) {
            $query->where('CompanyName', 'like', "%{$search}%");
        }

        if ($billingPeriod = $request->query('billing_period')) {
            $query->whereHas('subscription', function ($q) use ($billingPeriod) {
                $q->where('BillingPeriod', $billingPeriod);
            });
        }

        $customers = $query->select([
            'CustomerID',
            'CompanyName',
            'Description',
        ])->paginate(10);

        return response()->json($customers);
    }


    public function show($id)
    {
        $customer = Customer::with(['address', 'subscription'])->findOrFail($id);

        return new CustomerResource($customer);
    }
}
