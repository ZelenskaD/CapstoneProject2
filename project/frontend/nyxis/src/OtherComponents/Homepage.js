

import BrandImages from "./BrandImages";
import PriceRangeRedirect from "./CategoryLinks";
// import "./Styles/Homepage.css";

function Homepage() {



    return (


        <div className="success-page">
            {/* Render the SuccessModal with show as a prop */}
            <BrandImages  />
            <PriceRangeRedirect  />

        </div>


    )

}

export default Homepage;
