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
        Schema::create('consents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('young_person_id')->constrained('young_people')->cascadeOnDelete();
            $table->foreignId('guardian_id')->nullable()->constrained()->nullOnDelete();
            $table->boolean('general_attendance')->default(false);
            $table->boolean('offsite_events')->default(false);
            $table->boolean('media_consent')->default(false);
            $table->boolean('medical_treatment')->default(false);
            $table->boolean('transport')->default(false);
            $table->string('signature_name')->nullable();
            $table->string('signature_method')->default('digital');
            $table->timestamp('signed_at')->nullable();
            $table->string('signed_ip', 45)->nullable();
            $table->string('document_version', 20)->nullable();
            $table->json('extra')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consents');
    }
};
