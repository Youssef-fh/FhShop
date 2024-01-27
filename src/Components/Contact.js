import React from 'react'

const Contact = () => {
    const date=new Date().getFullYear();
    return (
        <>
            <div class="container mt-5">
                <h1 class="text-center">Contact Us</h1>
                <hr/>
                <div class="row">
                    <div class="col-md-6">
                        <p>Feel free to contact us with any questions or concerns you may have. Our customer service team is available 24/7 to assist you.</p>
                        <p><strong>Email:</strong> <a href="mailto:info@myecommercestore.com">info@myecommercestore.com</a></p>
                        <p><strong>Phone:</strong> <a href="tel:+1-800-555-1234">1-800-555-1234</a></p>
                        <p><strong>Address:</strong> 123 Main St, Anytown USA</p>
                    </div>
                    <div class="col-md-6">  
                        <form>
                            <div class="form-group mb-2">
                                <label for="name">Name</label>
                                <input type="text" class="form-control" id="name" placeholder="Enter your name"/>
                            </div>
                            <div class="form-group mb-2">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Enter your email"/>
                            </div>
                            <div class="form-group mb-2">
                                <label for="message">Message</label>
                                <textarea class="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
            <footer class="bg-light mt-5">
                <div class="container py-3">
                    <p class="text-center">&copy; My eCommerce Store {date}. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default Contact;
