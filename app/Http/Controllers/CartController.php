<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $product_id=$request->product_id;
            $product_quantity=$request->product_quantity;
            $product=Product::where('id',$product_id)->first();
            if($product)
            {
                if(Cart::where('product_id',$product_id)->where('user_id',$user_id)->exists())
                {
                    return response()->json([
                        'status'=>409,
                        'message'=>$product->name.' already exists in cart',
                    ]);
                }
                else
                {
                    $cartItem=new Cart();
                    $cartItem->create([
                        'user_id'=>$user_id,
                        'product_id'=>$product_id,
                        'product_quantity'=>$product_quantity,
                    ]);
                    return response()->json([
                        'status'=>201,
                        'message'=>'Product added to cart successfully',
                    ]);
                }
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'Product Not found',
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Login first to add to cart',
            ]);
        }
    }


    public function viewCart()
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $cart=Cart::where('user_id',$user_id)->get();
            return response()->json([
                'status'=>200,
                'cart'=>$cart,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Login first to view to cart',
            ]);
        }
    }

    public function updateQuantity($card_id,$scope)
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $cartItem=Cart::where('id',$card_id)->where('user_id',$user_id)->first();
            if($scope==='inc')
            {
                $cartItem->product_quantity+=1;
            }
            else if($scope==='dec')
            {
                $cartItem->product_quantity-=1;
            }
            $cartItem->update();
            return response()->json([
                'status'=>200,
                'message'=>'Quantity updated',
                ]);

        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Login first to continue',
            ]);
        }
    }

    public function cartDelete($cart_id)
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $cartItem=Cart::where('id',$cart_id)->where('user_id',$user_id)->first();
            if($cartItem)
            {
                $cartItem->delete();
                return response()->json([
                    'status'=>200,
                    'message'=>'Cart item removed successfully',
                    ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'Cart not found',
                    ]);
            }

        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Login first to continue',
            ]);
        }
    }

}
