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
        Schema::create('guardian_young_person', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guardian_id')->constrained()->cascadeOnDelete();
            $table->foreignId('young_person_id')->constrained('young_people')->cascadeOnDelete();
            $table->string('relationship')->nullable();
            $table->boolean('is_primary')->default(false);
            $table->unsignedTinyInteger('contact_order')->nullable();
            $table->boolean('can_pickup')->default(true);
            $table->boolean('receives_notifications')->default(true);
            $table->unique(['guardian_id', 'young_person_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guardian_young_person');
    }
};
