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
        Schema::create('token_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('token_account_id')->constrained('token_accounts')->cascadeOnDelete();
            $table->foreignId('young_person_id')->constrained('young_people')->cascadeOnDelete();
            $table->foreignId('performed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->integer('amount');
            $table->string('type', 20)->default('award');
            $table->string('reason')->nullable();
            $table->uuid('batch_id')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
            $table->index(['young_person_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('token_transactions');
    }
};
