<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Remove points created by factory (slug ends with uniqid hex pattern)
        DB::table('<redacted>_points')
            ->whereRaw("slug ~ '-[a-f0-9]{13}$'")
            ->delete();

        // Also remove points created by the test user from DatabaseSeeder
        $testUser = DB::table('users')->where('email', 'test@example.com')->first();
        if ($testUser) {
            DB::table('<redacted>_points')
                ->where('user_id', $testUser->id)
                ->delete();
        }
    }

    public function down(): void
    {
        // Cannot restore deleted demo points
    }
};
