<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WishlistController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum','isAdmin')->group(function(){
    Route::post('/logout',[AuthenticationController::class,'logout']);
    Route::get('/check_auth',function(){
        return response()->json(['messsage'=>'You are in','status'=>200],200);
    });
    //Categories
    Route::post('/store-category',[CategoryController::class,'store']);
    Route::get('/view-category',[CategoryController::class,'index']);
    Route::get('/edit-category/{id}',[CategoryController::class,'edit']);
    Route::put('/update-category/{id}',[CategoryController::class,'update']);
    Route::delete('/delete-category/{id}',[CategoryController::class,'destroy']);
    //Products
    Route::get('/allCategories',[CategoryController::class,'allCategories']);
    Route::post('/add-product',[ProductController::class,'store']);
    Route::get('/view-product',[ProductController::class,'index']);
    Route::get('/edit-product/{id}',[ProductController::class,'edit']);
    Route::put('/update-product/{id}',[ProductController::class,'update']);
    Route::put('/delete-product/{id}',[ProductController::class,'destroy']);
    //Orders
    Route::get('/view-orders',[OrderController::class,'index']);
    Route::get('/view-order-items/{id}',[OrderController::class,'ViewOrderItems']);

});

Route::controller(OrderController::class)->group(function(){
    Route::get('/view-orders-users','userOrders');
});

Route::controller(ProductController::class)->group(function(){
    Route::get('/product-index','product_index');
    Route::get('/product-featured','product_featured');
   /*  Route::post('/product-search','product_search'); */
});

Route::controller(WishlistController::class)->group(function(){
    Route::post('/add-to-wishList','addToWishList');
    Route::get('/whishlist','viewWishlist');
    Route::delete('/wishProd-delete/{wish_id}','wishProdDelete');
});

Route::controller(CartController::class)->group(function(){
    Route::post('/add-to-cart','addToCart');
    Route::get('/cart','viewCart');
    Route::put('/cart-updateQuantity/{card_id}/{scope}','updateQuantity');
    Route::delete('cart-delete/{cart_id}','cartDelete');
});

Route::controller(FrontendController::class)->group(function(){
    Route::get('getCategory','category');
    Route::get('fetch-products-slug/{slug}','product');
    Route::get('product-details/{category}/{product}','product_details');
});

Route::controller(OrderController::class)->group(function(){
    Route::post('/place-order','placeOrder');
    Route::post('/validate-order','validateOrder');
});

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[AuthenticationController::class,'logout']);
});

Route::controller(AuthenticationController::class)->group(function(){
    Route::post('/register','register');
    Route::post('/login','login');
    Route::post('/update-password','updatePassword');
    Route::post('/delete-account','deleteAccount');
});


