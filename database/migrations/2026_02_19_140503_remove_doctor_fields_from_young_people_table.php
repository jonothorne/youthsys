<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('young_people', function (Blueprint $table) {
            $table->dropColumn(['doctor_name', 'doctor_phone']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('young_people', function (Blueprint $table) {
            $table->string('doctor_name')->nullable();
            $table->string('doctor_phone', 30)->nullable();
        });
    }
};
