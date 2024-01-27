import logo from './fhShop.jpg';

const About = () => {
    const date=new Date().getFullYear();
    return (
        <>
            <div className="container mt-5">
                <h1 className="text-center">About Us</h1>
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                        <p>My eCommerce Store was founded in 2010 with the goal of providing customers with a convenient and hassle-free online shopping experience. We offer a wide selection of products from top brands at competitive prices.</p>
                        <p>Our team is dedicated to providing exceptional customer service, and we strive to make every customer feel valued and satisfied with their purchase. We believe that shopping should be easy and enjoyable, and we work hard to make that a reality for our customers.</p>
                    </div>
                    <div className="col-md-6">
                        <img src={logo} alt="Our Store" width="300px" height="200px" className="img-fluid mx-5"/>
                    </div>
                </div>
            </div>
            <footer className="bg-light mt-5">
                <div className="container py-3">
                <p className="text-center">&copy; My eCommerce Store {date}. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default About;
