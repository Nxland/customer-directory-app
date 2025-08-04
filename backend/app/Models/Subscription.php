<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $primaryKey = 'SubscriptionID';
    protected $table = 'subscription';
    public $timestamps = false;

    protected $fillable = [
        'CustomerID',
        'Cost',
        'PaymentMethod',
        'CreditBalance',
        'BillingPeriod',
        'PreferredCurrency',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'CustomerID', 'CustomerID');
    }
}
