import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Products = () => {
    const[categories,setCategories]=useState([]);
    const[errors,setErrors]=useState([]);
    const[productInput,setProductInput]=useState({
        category_id:'',
        slug:'',
        name:'',
        description:'',

        meta_title:'',
        meta_keywords:'',
        meta_description:'',

        selling_price:'',
        original_price:'',
        quantity:'',
        brand:"",
        featured:'',
        popular:'',
        status:'',
    });

    const [image, setImage] = useState(null);
    /* const [imagePreview, setImagePreview] = useState([]); */

    useEffect(()=>{
        axios.get('/api/allCategories').then(res=>{
            if(res.data.status===200)
            {
                setCategories(res.data.categories);
            }
        });
    },[]);

    const[allCheckBox,setCheckBox]=useState([]);

    const handleCheckBox=(e)=>
    {
        e.persist();
        setCheckBox({...allCheckBox,[e.target.name]:e.target.checked});
    }
    
    const handleInput=(e)=>
    {
        e.persist();
        setProductInput({...productInput,[e.target.name]:e.target.value});
    }

    const handleImage=(e)=>
    {
        setImage(e.target.files[0]);
/*         setImagePreview(URL.createObjectURL(e.target.files[0]));
 */        /* const files = Array.from(e.target.files);
        setImages(files);
        setImagePreviews(files.map((file) => URL.createObjectURL(file))); */
    }

    /* const handleDeleteClick = (index) => {
        setImage((prevImages) => {
            const newImages = [...prevImages];
            newImages.splice(index, 1);
            return newImages;
            });
            setImagePreview((prevPreviews) => {
            const newPreviews = [...prevPreviews];
            newPreviews.splice(index, 1);
            return newPreviews;
        });
    }; */

    const submitProduct=(e)=>
    {
        e.preventDefault();
        const formData = new FormData();

            formData.append('category_id', productInput.category_id);
            formData.append('slug', productInput.slug);
            formData.append('name', productInput.name);
            formData.append('image',image);
            formData.append('description', productInput.description);
            formData.append('meta_title', productInput.meta_title);
            formData.append('meta_description', productInput.meta_description);
            formData.append('meta_keywords', productInput.meta_keywords);
            formData.append('selling_price', productInput.selling_price);
            formData.append('original_price', productInput.original_price);
            formData.append('quantity', productInput.quantity);
            formData.append('brand', productInput.brand);
            allCheckBox.featured && formData.append('featured', allCheckBox.featured);
            allCheckBox.popular && formData.append('popular', allCheckBox.popular);
            allCheckBox.status && formData.append('status', allCheckBox.status);

            /* for (let i = 0; i < images.length; i++) {
            formData.append('images[]', images[i]);
            } */
            /* console.log(image.image);
            console.log(formData); */


        axios.post('/api/add-product',formData).then(res=>{
            if(res.data.status===200)
            {
               /*  console.log(allCheckBox); */
                Swal.fire('Success',res.data.message,'success');
                setProductInput({...productInput,
                    category_id:'',
                    slug:'',
                    name:'',
                    description:'',
            
                    meta_title:'',
                    meta_keywords:'',
                    meta_description:'',
            
                    selling_price:'',
                    original_price:'',
                    quantity:'',
                    brand:"",
                });
                setCheckBox({...allCheckBox,
                    featured:false,
                    popular:false,
                    status:false,
                });
                setErrors([]);
            }
            else if(res.data.status===422)
            {
                Swal.fire('Empty fields','','error');
                setErrors(res.data.error);
                console.log(res.data.dd);
            }
        });
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add Product
                        <Link to='/admin/view-product' className="btn btn-primary btn-sm float-end">View Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitProduct} encType="multipart/form-data">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags-tab-pane" type="button" role="tab" aria-controls="seotags-tab-pane" aria-selected="false">SEO Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails-tab-pane" type="button" role="tab" aria-controls="otherdetails-tab-pane" aria-selected="false">Other Details</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                                <div className="form-group mb-3">
                                    <label>Select Category</label>
                                    <select name="category_id" onChange={handleInput} value={productInput.category_id}>
                                        <option value="null">Select A caetgory</option>
                                        {
                                            categories.map(cat=>{
                                                return(
                                                    <option value={cat.id} key={cat.id}>{cat.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <span className="text-danger">{errors.category_id}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" name="slug" className="form-control" onChange={handleInput} value={productInput.slug}/>
                                    <span className="text-danger">{errors.slug}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" className="form-control" onChange={handleInput} value={productInput.name}/>
                                    <span className="text-danger">{errors.name}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea name="description" cols="30" rows="10" className="form-control" onChange={handleInput} value={productInput.description}></textarea>
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade" id="seotags-tab-pane" role="tabpanel" aria-labelledby="seotags-tab" tabIndex="0">
                                <div className="form-group mb-3 mt-3">
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title" className="form-control" onChange={handleInput} value={productInput.meta_title} />
                                    <span className="text-danger">{errors.meta_title}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Keywords</label>
                                    <input type="text" name="meta_keywords" className="form-control" onChange={handleInput} value={productInput.meta_keywords}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <input type="text" name="meta_description" className="form-control" onChange={handleInput} value={productInput.meta_description}/>
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade" id="otherdetails-tab-pane" role="tabpanel" aria-labelledby="otherdetails-tab" tabIndex="0">
                                <div className="row">
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="selling_price">Selling Price</label>
                                        <input type="text" name="selling_price" id="selling_price" className="form-control" onChange={handleInput} value={productInput.selling_price} />
                                        <span className="text-danger">{errors.selling_price}</span>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="original_price">Original Price</label>
                                        <input type="text" name="original_price" id="original_price" className="form-control" onChange={handleInput} value={productInput.original_price}/>
                                        <span className="text-danger">{errors.original_price}</span>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="quantity">Quantity</label>
                                        <input type="text" name="quantity" id="quantity" className="form-control" min={0} onChange={handleInput} value={productInput.quantity} />
                                        <span className="text-danger">{errors.quantity}</span>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="brand">Brand</label>
                                        <input type="text" name="brand" id="brand" className="form-control" onChange={handleInput} value={productInput.brand}/>
                                        <span className="text-danger">{errors.brand}</span>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label htmlFor="image">Image</label>
                                        <input type="file" name="image" id="image" onChange={handleImage} className="form-control" />
                                        {/* <div className="row">
                                            {imagePreview.map((preview,index) => (
                                            <div className="">
                                                <img key={index} src={preview} alt="Selected_Image" className="col-md-4 mx-1" height='100px' width="100" />
                                                <button type="button" onClick={() => handleDeleteClick(index)}>Delete</button>
                                            </div>
                                        ))}
                                        </div> */}
                                        
                                        <span className="text-danger">{errors.image}</span>
                                    </div>
                                    <div className="col-md-6 form-group mb-3">
                                        <input type="checkbox" name="featured" id="featured" className="form-checkbox mx-2" onChange={handleCheckBox}  />
                                        <label htmlFor="featured">Featured</label>
                                    </div>
                                    <div className="col-md-3 form-group mb-3">
                                        <input type="checkbox" name="popular" id="popular" className="form-checkbox mx-2" onChange={handleCheckBox} />
                                        <label htmlFor="popular">Popular</label>
                                    </div>
                                    <div className="col-md-3 form-group mb-3">
                                        <input type="checkbox" name="status" id="status" className="form-checkbox mx-2" onChange={handleCheckBox} />
                                        <label htmlFor="status">Status</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success px-4 mt-2">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Products;
