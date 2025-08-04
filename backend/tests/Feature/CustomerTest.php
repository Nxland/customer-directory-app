<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\Subscription;

class CustomerTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(): void
    {
        parent::setUp();

        $this->artisan('db:seed');
    }

    public function test_can_list_customers()
    {
        $response = $this->getJson('/customers');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'current_page',
                     'data' => [
                         '*' => ['CustomerID', 'CompanyName', 'Description']
                     ]
                 ]);
    }

    public function test_can_filter_customers_by_name()
    {
        $name = Customer::first()->CompanyName;

        $response = $this->getJson("/customers?query=" . urlencode(substr($name, 0, 3)));

        $response->assertStatus(200)
                 ->assertJsonFragment(['CompanyName' => $name]);
    }

    public function test_can_filter_customers_by_billing_period()
    {
        $response = $this->getJson('/customers?billing_period=monthly');

        $response->assertStatus(200)
                 ->assertJsonStructure(['data']);
    }

    public function test_can_show_customer_details()
    {
        $customer = Customer::with(['address', 'subscription'])->first();

        $response = $this->getJson("/customers/{$customer->CustomerID}");

        $response->assertStatus(200)
                 ->assertJsonStructure([
                    'data' => [
                        'company_name',
                        'description',
                        'website',
                        'subscription_cost',
                        'billing_period',
                        'address',
                    ],
                 ]);
    }

    public function test_returns_404_for_missing_customer()
    {
        $response = $this->getJson('/customers/99999');

        $response->assertStatus(404);
    }
}
