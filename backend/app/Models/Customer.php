<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'CustomerID';
    protected $table = 'customer';
    public $timestamps = true;

    protected $fillable = [
        'CompanyName',
        'Description',
        'Email',
        'Active',
        'CreatedAt',
        'UpdatedAt',
        'DeletedAt',
    ];

    const CREATED_AT = 'CreatedAt';
    const UPDATED_AT = 'UpdatedAt';
    const DELETED_AT = 'DeletedAt';

    public function address()
    {
        return $this->hasOne(CustomerAddress::class, 'CustomerID', 'CustomerID');
    }

    public function subscription()
    {
        return $this->hasOne(Subscription::class, 'CustomerID', 'CustomerID');
    }
}
