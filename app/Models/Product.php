<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable=[
        'category_id',
        'slug',
        'name',
        'description',
        'meta_title',
        'meta_keywords',
        'meta_description',
        'selling_price',
        'original_price',
        'quantity',
        'brand',
        'featured',
        'popular',
        'status',
        'image',
    ];

    protected $with=['category'];

    public function category()
    {
        return $this->belongsTo(Category::class,'category_id','id');
    }
    
    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
