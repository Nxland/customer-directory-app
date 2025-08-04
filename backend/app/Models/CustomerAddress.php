<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerAddress extends Model
{
    protected $primaryKey = 'CustomerAddressID';
    protected $table = 'customeraddress';
    public $timestamps = false;

    protected $fillable = [
        'CustomerID',
        'StreetAddress',
        'City',
        'StateProvince',
        'PostalCode',
        'Country',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'CustomerID', 'CustomerID');
    }
}
