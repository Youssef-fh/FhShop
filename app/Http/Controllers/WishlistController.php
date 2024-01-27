<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function addToWishList(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $product_id=$request->product_id;
            $product=Product::where('id',$product_id)->first();
            if($product)
            {
                if(Wishlist::where('product_id',$product_id)->where('user_id',$user_id)->exists())
                {
                    return response()->json([
                        'status'=>409,
                        'message'=>$product->name.' already exists in wishList',
                    ]);
                }
                else
                {
                    $wish=new Wishlist();
                    $wish->create([
                        'user_id'=>$user_id,
                        'product_id'=>$product_id,
                    ]);
                    return response()->json([
                        'status'=>201,
                        'message'=>'Product added to wishList successfully',
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
                'message'=>'Login first to continue',
            ]);
        }
    }

    public function viewWishlist()
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $wishlists=Wishlist::where('user_id',$user_id)->get();
            return response()->json([
                'status'=>200,
                'wishlist'=>$wishlists,
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

    public function wishProdDelete($wish_id)
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $wish_delete=Wishlist::where('user_id',$user_id)->where('id',$wish_id)->first();
            if($wish_delete)
            {
                $wish_delete->delete();
                return response()->json([
                    'status'=>200,
                    'message'=>'Product Removed Successfully',
                    ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'Wish product Not Found',
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
