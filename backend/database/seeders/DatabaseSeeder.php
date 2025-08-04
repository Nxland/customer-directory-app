<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder {

    private array $usStates = [
        'CA' => ['California', ['San Francisco', 'Los Angeles', 'San Jose', 'San Diego', 'Mountain View', 'Palo Alto', 'Sunnyvale', 'Santa Clara']],
        'NY' => ['New York', ['New York City', 'Buffalo', 'Rochester', 'Albany']],
        'TX' => ['Texas', ['Austin', 'Houston', 'Dallas', 'San Antonio']],
        'MA' => ['Massachusetts', ['Boston', 'Cambridge', 'Somerville', 'Waltham']],
        'WA' => ['Washington', ['Seattle', 'Bellevue', 'Redmond', 'Kirkland']],
    ];

    public function run(): void {
        $companies = json_decode(file_get_contents(__DIR__ . '/companies.json'), true);

        foreach ($companies as $company) {
            $slug = Str::slug($company['name']);
            $email = ['admin', 'team', 'support'][rand(0, 2)] . "@$slug.com";

            if (DB::table('Customer')->where('Email', $email)->exists()) {
                continue;
            }

            // Insert Customer
            $customerId = DB::table('Customer')->insertGetId([
                'CompanyName' => $company['name'],
                'Description' => $company['desc'],
                'Email' => $email,
                'Active' => true,
                'CreatedAt' => Carbon::createFromTimestamp(time() - rand(0, 60 * 60 * 24 * 365)),
                'UpdatedAt' => now(),
                'DeletedAt' => null,
            ]);

            // Insert Address
            $state = array_rand($this->usStates);
            $cities = $this->usStates[$state][1];
            DB::table('CustomerAddress')->insert([
                'CustomerID' => $customerId,
                'StreetAddress' => rand(100, 9999) . ' ' . ['Innovation', 'Technology', 'AI', 'Research', 'Silicon', 'Digital', 'Tech', 'Science'][rand(0, 7)] . ' ' . ['Drive', 'Street', 'Avenue', 'Boulevard', 'Road', 'Way'][rand(0, 5)],
                'City' => $cities[array_rand($cities)],
                'StateProvince' => $this->usStates[$state][0],
                'PostalCode' => sprintf("%05d", rand(10000, 99999)),
                'Country' => 'United States',
            ]);

            // Insert Subscription
            DB::table('Subscription')->insert([
                'CustomerID' => $customerId,
                'Cost' => rand(99, 9999),
                'PaymentMethod' => ['creditcard', 'invoice'][rand(0, 1)],
                'CreditBalance' => rand(0, 199),
                'BillingPeriod' => ['monthly', 'yearly'][rand(0, 1)],
                'PreferredCurrency' => 'USD',
            ]);
        }
    }
}
