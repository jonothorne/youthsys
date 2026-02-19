<?php

use App\Http\Controllers\Admin\AttendanceController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SearchController;
use App\Http\Controllers\Admin\TokenController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\YoungPersonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Public\EnrolmentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : redirect()->route('enrolment.form');
});

Route::get('/enrol', [EnrolmentController::class, 'create'])->name('enrolment.form');
Route::post('/enrol', [EnrolmentController::class, 'store'])->name('enrolment.store');
Route::inertia('/enrol/thank-you', 'Enrolment/ThankYou')->name('enrolment.thank-you');

Route::get('/dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('youth', [YoungPersonController::class, 'index'])->name('youth.index');
    Route::post('youth', [YoungPersonController::class, 'store'])->name('youth.store');
    Route::get('youth/{youngPerson}', [YoungPersonController::class, 'show'])->name('youth.show');
    Route::put('youth/{youngPerson}', [YoungPersonController::class, 'update'])->name('youth.update');
    Route::delete('youth/{youngPerson}', [YoungPersonController::class, 'destroy'])->name('youth.destroy');

    Route::get('attendance', [AttendanceController::class, 'index'])->name('attendance.index');
    Route::post('attendance', [AttendanceController::class, 'store'])->name('attendance.store');
    Route::get('attendance/{attendanceSession}', [AttendanceController::class, 'show'])->name('attendance.show');
    Route::patch('attendance/{attendanceSession}/records', [AttendanceController::class, 'updateRecords'])->name('attendance.records.update');
    Route::post('attendance/{attendanceSession}/archive', [AttendanceController::class, 'archive'])->name('attendance.archive');
    Route::post('attendance/{attendanceSession}/restore', [AttendanceController::class, 'restore'])->name('attendance.restore');
    Route::delete('attendance/{attendanceSession}', [AttendanceController::class, 'destroy'])->name('attendance.destroy');

    Route::get('tokens', [TokenController::class, 'index'])->name('tokens.index');
    Route::post('tokens/adjust', [TokenController::class, 'adjust'])->name('tokens.adjust');

    Route::get('users', [UserManagementController::class, 'index'])->name('users.index');
    Route::post('users', [UserManagementController::class, 'store'])->name('users.store');
    Route::put('users/{user}', [UserManagementController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');

    Route::get('search', SearchController::class)->name('search');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
