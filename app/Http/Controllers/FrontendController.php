<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function category()
    {
        $categories=Category::where('status','0')->get();
        return response()->json([
            'status'=>200,
            'categories'=>$categories,
        ]);
    }

    public function product($slug)
    {
        $category=Category::where('slug',$slug)->where('status','0')->first();
        if($category)
        {
            $product=Product::where('category_id',$category->id)->where('status','0')->get();
            if($product)
            {
                return response()->json([
                    'status'=>200,
                    'product_data'=>[
                        'product'=>$product,
                        'category'=>$category,
                    ],
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>400,
                    'message'=>'No such product available',
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No such category found',
            ]);
        }
    }

    public function product_details($category,$product)
    {
        $category=Category::where('slug',$category)->where('status','0')->first();
        if($category)
        {
            $product=Product::where('category_id',$category->id)->where('slug',$product)->where('status','0')->get();
            if($product)
            {
                return response()->json([
                    'status'=>200,
                    'productDetails'=>$product,
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'No such product available',
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>400,
                'message'=>'No such category found',
            ]);
        }
    }

}
