<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRoleRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserManagementController extends Controller
{
    public function index()
    {
        abort_unless(auth()->user()->can('manage users'), 403);

        $users = User::with('roles')->orderBy('name')->get();
        $roles = Role::pluck('name');

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        $user->syncRoles([$data['role']]);

        return redirect()->route('admin.users.index')->with('success', 'User created');
    }

    public function update(UpdateUserRoleRequest $request, User $user)
    {
        if ($user->id === $request->user()->id && $request->input('role') !== 'admin') {
            return back()->withErrors(['role' => 'You cannot remove your own admin role.']);
        }

        $payload = $request->validated();

        $user->forceFill([
            'name' => $payload['name'] ?? $user->name,
        ])->save();

        if (!empty($payload['password'])) {
            $user->update(['password' => Hash::make($payload['password'])]);
        }

        $user->syncRoles([$payload['role']]);

        return back()->with('success', 'User updated');
    }

    public function destroy(User $user)
    {
        abort_unless(auth()->user()->can('manage users'), 403);

        if ($user->id === auth()->id()) {
            return back()->withErrors(['user' => 'You cannot delete your own account.']);
        }

        $user->delete();

        return back()->with('success', 'User removed');
    }
}
