import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <section className="d-flex align-items-center min-vh-100 py-5">
        <div className="container py-5">
            <div className="row align-items-center">
                <div className="col-md-6 order-md-2">
                    <div className="lc-block">
                        <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_kcsr6fcp.json" background="transparent" speed="1" loop="" autoplay=""></lottie-player>
                    </div>
                </div>
                <div className="col-md-6 text-center text-md-start ">
                    <div className="lc-block mb-3">
                        <div editable="rich">
                           
                        </div>
                    </div>
                    <div className="lc-block mb-3">
                        <div editable="rich">
                            <h1 className="display-1 fw-bold text-muted">Error 404</h1>

                        </div>
                    </div>
                    <div className="lc-block mb-5">
                        <div editable="rich">
                            <p className="rfs-11 fw-light"> The page you are looking for was moved, removed or might never existed.</p>
                        </div>
                    </div>
                    <div className="lc-block">
                        <Link className="btn btn-lg btn-secondary" to="/" role="button">Back to homepage</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default NotFound