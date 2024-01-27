<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{

    public function index()
    {
        $products=Product::select(['id','category_id','name','selling_price','image','status'])->get();
        return response()->json([
            'status'=>200,
            'products'=>$products,
        ]);
    }

    public function product_index(Request $request)
    {
        $query = $request->input('search');
        if($query)
        {
                if(Product::where('name', 'like', '%' . $query . '%')->orWhere('brand','like','%'.$query."%")->exists())
                {
                    $products=Product::where('name', 'like', '%' . $query . '%')->orWhere('brand','like','%'.$query."%")->get();
                }
                else
                {
                    return response()->json([
                        'status'=>404,
                    ]);
                }
        }
        else
        {
            $products=Product::where('status',0)->where('popular',0)->get();
        }
        return response()->json([
            'status'=>200,
            'products'=>$products,
        ]);
    }

   /*  public function product_search(Request $request)
    {
        if($request->search)
        {
            if(Product::where('name','like','%'.$request->search.'%')->orWhere('brand','like','%'.$request->search."%")->orWhere('slug','like','%'.$request->search.'%')->exists())
            {
                $products=Product::where('name','like','%'.$request->search.'%')->orWhere('brand','like','%'.$request->search."%")->orWhere('slug','like','%'.$request->search.'%')->get();
            }
            else
            {
                $products=Product::where('status',0)->where('popular',0)->get();
            }
        }
        else
        {
            $products=Product::where('status',0)->where('popular',0)->get();
        }
        return response()->json([
            'status'=>200,
            'products'=>$products,
            ]);
    } */

    public function product_featured()
    {
        $products=Product::where('status',0)->where('featured',0)->get();
        return response()->json([
            'status'=>200,
            'featured_products'=>$products,
        ]);
    }

    public function edit($id)
    {
        $product=Product::find($id);
        if($product)
        {
            return response()->json([
                'status'=>200,
                'product'=>$product,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'Product not found',
            ]);
        }
    }

    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'category_id'=>'required|max:191',
            'slug'=>'required|max:191',
            'name'=>'required|max:191',
            'meta_title'=>'required|max:191',
            'brand'=>'required|max:20',
            'selling_price'=>'required|max:20',
            'original_price'=>'required|max:20',
            'quantity'=>'required|integer',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'error'=>$validator->messages(),
                'dd'=>$request->image,
            ]);
        }
        else
        {
            if($request->hasFile('image'))
            {
                $fileName = time().$request->file('image')->getClientOriginalName();
                $path = $request->file('image')->storeAs('images', $fileName, 'public');

                /* foreach ($request->file('images') as $image)
                {
                    $filename = $image->store('images');

                    $newImage = new Image([
                        'filename' => $filename,
                        'mime_type' => $image->getClientMimeType(),
                        'size' => $image->getClientSize(),
                    ]);
                    $images[] = $newImage;
                } */
            }
            else
            {
                $path =null;
            }

            $product=new Product();
            $product->create([
                'category_id'=>$request->category_id,
                'slug'=>$request->slug,
                'name'=>$request->name,
                'description'=>$request->description,
                'meta_title'=>$request->meta_title,
                'meta_keywords'=>$request->meta_keywords,
                'meta_description'=>$request->meta_description,
                'selling_price'=>$request->selling_price,
                'original_price'=>$request->original_price,
                'quantity'=>$request->quantity,
                'image'=>$path,
                'brand'=>$request->brand,
                'featured'=>$request->featured===true ? '1' : '0',
                'popular'=>$request->popular===true ? '1' : '0',
                'status'=>$request->status===true ? '1' : '0',
            ]);
            return response()->json([
                'status'=>200,
                'message'=>'Product added successfully',
            ]);
        }
    }

    public function update(Request $request,$id)
    {
        $validator=Validator::make($request->all(),[
            'category_id'=>'required|max:191',
            'slug'=>'required|max:191',
            'name'=>'required|max:191',
            'meta_title'=>'required|max:191',
            'brand'=>'required|max:20',
            'selling_price'=>'required|max:20',
            'original_price'=>'required|max:20',
            'quantity'=>'required|integer',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=>422,
                'error'=>$validator->messages(),
            ]);
        }
        else
        {
            $product=Product::find($id);
            $oldImage=$product->image;
            if($request->hasFile('image'))
            {
                if(Storage::has($oldImage))
                {
                    Storage::delete($oldImage);
                    $fileName = time().$request->file('photo')->getClientOriginalName();
                    $path = $request->file('photo')->storeAs('images', $fileName, 'public');
                }
                else
                {
                    $path=$oldImage;
                }
            }
            else
            {
                $path=$oldImage;
            }
            if($product)
            {
                $product->update([
                    'category_id'=>$request->category_id,
                    'slug'=>$request->slug,
                    'name'=>$request->name,
                    'description'=>$request->description,
                    'meta_title'=>$request->meta_title,
                    'meta_keywords'=>$request->meta_keywords,
                    'meta_description'=>$request->meta_description,
                    'selling_price'=>$request->selling_price,
                    'original_price'=>$request->original_price,
                    'quantity'=>$request->quantity,
                    'image'=>$path,
                    'brand'=>$request->brand,
                    'featured'=>$request->featured===true ? '1' : '0',
                    'popular'=>$request->popular===true ? '1' : '0',
                    'status'=>$request->status===true ? '1' : '0',
                ]);
                return response()->json([
                    'status'=>200,
                    'message'=>'Product updated successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'Product not found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        # code...
    }
}
