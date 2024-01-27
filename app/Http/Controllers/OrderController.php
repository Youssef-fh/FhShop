<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{

    public function index()
    {
        $orders=Order::all();
        return response()->json([
            'status'=>200,
            'orders'=>$orders
        ]);
    }



    public function placeOrder(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $validator=Validator::make($request->all(),[
                'Full_name'=>'required|max:191',
                'phone'=>'required|max:15',
                'email'=>'required|email|max:191',
                'address'=>'required|max:191',
                'city'=>'required|max:191',
                'state'=>'required|max:191',
                'zipcode'=>'required|max:15',
            ]);
            if($validator->fails())
            {
                return response()->json([
                    'status'=>422,
                    'errors'=>$validator->messages(),
                ]);
            }
            else
            {
                $user_id=auth('sanctum')->user()->id;
                $order=new Order();

                $order->user_id=$user_id;
                $order->Full_name=$request->Full_name;
                $order->phone=$request->phone;
                $order->email=$request->email;
                $order->address=$request->address;
                $order->city=$request->city;
                $order->state=$request->state;
                $order->zipcode=$request->zipcode;
                $order->total=$request->total;
                $order->payment_mode=$request->payment_mode;
                $order->tracking_no='ECOM'.rand(1111,9999);
                $order->save();


                $cart=Cart::where('user_id',$user_id)->get();

                $orderItems=[];
                foreach($cart as $item)
                {
                    $orderItems[]=[
                        'product_id'=>$item->product_id,
                        'product_name'=>$item->product->name,
                        'quantity'=>$item->product_quantity,
                        'price'=>$item->product->selling_price,
                    ];
                    $item->product->update([
                        'quantity'=>$item->product->quantity - $item->product_quantity,
                    ]);
                };

                $order->orderitems()->createMany($orderItems);
                Cart::destroy($cart);

                return response()->json([
                    'status'=>200,
                    'message'=>"Order placed successfully",
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Login First to place order'
            ]);
        }
    }


    public function validateOrder(Request $request)
    {
        if(auth('sanctum')->check())
        {
            $validator=Validator::make($request->all(),[
                'Full_name'=>'required|max:191',
                'phone'=>'required|max:15',
                'email'=>'required|email|max:191',
                'address'=>'required|max:191',
                'city'=>'required|max:191',
                'state'=>'required|max:191',
                'zipcode'=>'required|max:15',
            ]);
            if($validator->fails())
            {
                return response()->json([
                    'status'=>422,
                    'errors'=>$validator->messages(),
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>200,
                    'message'=>"Form validated successfully",
                ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Login First to place order'
            ]);
        }
    }

    public function userOrders()
    {
        if(auth('sanctum')->check())
        {
            $user_id=auth('sanctum')->user()->id;
            $orders=Order::where('user_id',$user_id)->get();
            return response()->json([
                'status'=>200,
                'orders'=>$orders,
            ]);
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Login First to continue'
            ]);
        }
    }

    public function ViewOrderItems($id)
    {
        $orderItems=OrderItems::where('order_id',$id)->get();
        return response()->json([
            'status'=>200,
            'orderItems'=>$orderItems
            ]);
    }

}
