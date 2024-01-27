<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Validator as ValidationValidator;

class AuthenticationController extends Controller
{
    public function register(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'name'=>'required|string|max:191',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|min:8'
        ]);
        if($validator->fails())
            return response()->json([
                'errors'=>$validator->messages(),
            ]);
        else
        {
            $user=User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password)
            ]);
            $token=$user->createToken($user->email.'_Token',[''])->plainTextToken;
            $role='';
            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'email'=>$user->email,
                'token'=>$token,
                'message'=>'Registred Successfully',
                'role'=>$role,
            ]);
        }
    }

    public function login(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'email'=>'required',
            'password'=>'required|min:8'
        ]);
        if($validator->fails())
        {
            return response()->json([
                'errors'=>$validator->messages()
            ]);
        }
        else{
            $user = User::where('email', $request->email)->first();

            if (! $user || ! Hash::check($request->password, $user->password))
            {
                return response()->json([
                    'status'=>401,
                    'message'=>'Invalid Credentials'
                ]);
            }
            else
            {
                if($user->role_as===1)
                {
                    $role='admin';
                    $token=$user->createToken($user->email.'_AdminToken',['server:admin'])->plainTextToken;
                }
                else
                {
                    $role='';
                    $token=$user->createToken($user->email.'_Token',[''])->plainTextToken;
                }
                return response()->json([
                    'status'=>200,
                    'username'=>$user->name,
                    'email'=>$user->email,
                    'token'=>$token,
                    'message'=>'Logged In Successfully',
                    'role'=>$role,
                ]);
            }

        }
    }

    public function logout()
    {
        PersonalAccessToken::where('tokenable_id', auth()->id())->delete();

        return response()->json([
            'status'=>200,
            'message'=>'Logged Out Successfully'
        ]);

    }


    public function updatePassword(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $validator=Validator::make($request->only(['password']),[
                'password'=>'required|min:8'
            ]);
            if($validator->fails())
            {
                return response()->json([
                    'status'=>201,
                    'errors'=>$validator->messages()
                ]);
            }
            else
            {
                $user=User::where('id',auth('sanctum')->user()->id);
                $user->update([
                    'password'=>Hash::make($request->password),
                ]);
                return response()->json([
                    'status'=>200,
                    'message'=>'Password updated successfully',
                ]);
            }

        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>"Login first to continue",
            ]);
        }
    }

    public function deleteAccount()
    {
        if(auth('sanctum')->check())
        {
            $user=User::where('id',auth('sanctum')->user()->id);
            $user->delete();
            return response()->json([
                'status'=>200,
                'message'=>"Account deleted successfully",
            ]);
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>"Login first to continue",
            ]);
        }
    }

}
