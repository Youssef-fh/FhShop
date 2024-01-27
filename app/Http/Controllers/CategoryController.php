<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{

    public function index()
    {
        $categories=Category::all();
        return response()->json([
            'status'=>200,
            'category'=>$categories,
        ]);
    }


    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'meta_title'=>'required|max:191',
            'slug'=>'required|max:191',
            'name'=>'required|max:191',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>400,
                'error'=>$validator->messages(),
            ]);
        }
        else
        {
            $category=new Category;
            $category->create([
            'meta_title'=>$request->meta_title,
            'meta_keywords'=>$request->meta_keywords,
            'meta_description'=>$request->meta_description,
            'slug'=>$request->slug,
            'name'=>$request->name,
            'description'=>$request->description,
            'status'=>$request->status==true?'1':'0',
        ]);
        return response()->json([
            'status'=>200,
            'message'=>'Category added successfully',
        ]);
        }
    }

    public function edit($id)
    {
        $category=Category::where('id',$id)->first();
        if($category)
        {
            return response()->json([
                'status'=>200,
                'category'=>$category,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No category Id found',
            ]);
        }
    }

    public function update(Request $request ,$id)
    {
        $validator=Validator::make($request->all(),[
            'meta_title'=>'required|max:191',
            'slug'=>'required|max:191',
            'name'=>'required|max:191',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>400,
                'error'=>$validator->messages(),
            ]);
        }
        else
        {
            $category=Category::where('id',$id)->first();
            if($category)
            {
                $category->update([
                    'meta_title'=>$request->meta_title,
                    'meta_keywords'=>$request->meta_keywords,
                    'meta_description'=>$request->meta_description,
                    'slug'=>$request->slug,
                    'name'=>$request->name,
                    'description'=>$request->description,
                    'status'=>$request->status===true?'1':'0',
                ]);
                return response()->json([
                    'status'=>200,
                    'message'=>'Category updated successfully',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'No category Id found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $category=Category::find($id);
        if($category)
        {
            $category->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Category deleted successfully',
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'No category Id found',
            ]);
        }
    }

    public function allCategories()
    {
        $categories=Category::where('status','0')->get();
        return response()->json([
            'status'=>200,
            'categories'=>$categories, 
        ]);
    }
}
