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
        Schema::create('young_people', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('preferred_name')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('gender', 20)->nullable();
            $table->string('school_year', 25)->nullable();
            $table->string('school_name')->nullable();
            $table->string('primary_language')->nullable();
            $table->text('allergies')->nullable();
            $table->text('medical_notes')->nullable();
            $table->text('medications')->nullable();
            $table->text('dietary_requirements')->nullable();
            $table->string('doctor_name')->nullable();
            $table->string('doctor_phone', 30)->nullable();
            $table->boolean('photo_consent')->default(false);
            $table->boolean('active')->default(true);
            $table->string('status', 20)->default('pending');
            $table->timestamp('activated_at')->nullable();
            $table->json('metadata')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('young_people');
    }
};
