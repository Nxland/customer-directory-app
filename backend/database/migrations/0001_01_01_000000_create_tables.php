<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void {
        $sql = file_get_contents(__DIR__ . '/bt_test.sql');
        $statements = array_filter(array_map('trim', explode(';', $sql)));

        foreach ($statements as $statement) {
            if (!empty($statement)) {
                DB::statement($statement);
            }
        }
    }

    public function down(): void {
        Schema::dropIfExists('Customer');
        Schema::dropIfExists('CustomerAddress');
        Schema::dropIfExists('Subscription');
    }
};
