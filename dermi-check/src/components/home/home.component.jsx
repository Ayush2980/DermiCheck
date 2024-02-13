import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import "./home.styles.css";
import photo from "../assets/img/edited.png";
import cardImage1 from "../assets/img/cards1.png";
import cardImage2 from "../assets/img/cards2.png";
import cardImage3 from "../assets/img/cards3.png";
import cardImage4 from "../assets/img/cards4.png";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
import Reveal from "../animation/Reveal.component";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [screen, setScreen] = useState("h");
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get("http://localhost:8000/api/home", {
        withCredentials: true,
      });
      console.log(data);
      if (data.data.user) {
        setCurrentUser(data.data.user);
      } else {
        setCurrentUser(null);
        setScreen("No user");
      }
    }
    fetchData();
  }, []);

  return (
    <Fragment>
      <div class="landing-page">
        <div class="content">
          <div class="container">
            <Reveal>
              <div class="info" style={{ width: "75%" }}>
                <h1>DermiCheck</h1>
                <p>
                  Uncover healthier skin with our advanced app. Quickly identify
                  and understand skin conditions using image recognition. From
                  common issues to rare challenges, get accurate diagnoses
                  effortlessly. Take control of your skin health journey with
                  confidence. Welcome to a future where skincare is simple and
                  personalized.
                </p>
                <button style={{backgroundColor : "#10c3a5" , color : "white"}} onClick={() =>navigate("/check") }>Get Started</button>
              </div>
            </Reveal>
            <Reveal>
              <div class="image">
                {/* <img src="https://i.postimg.cc/65QxYYzh/001234.png" /> */}
                <img src={photo} className="img" />
              </div>
            </Reveal>
          </div>
        </div>
        <div className="grids-container" style={{ margin: "10vh" }}>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-5 col-md-12 mx-4 my-4 ">
              <Reveal>
                <div class="card d-flex align-items-center">
                  <img
                    src={cardImage1}
                    style={{ height: "265px", width: "265px" }}
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h5 class="card-title text-center">
                      How DermiCheck Helps ?
                    </h5>
                    <p class="card-text text-center">
                      Instantly receive comprehensive results for your skin
                      concerns with our intuitive web app. Upload images, and
                      our advanced AI algorithms will provide quick and accurate
                      diagnoses, empowering you with essential information about
                      your skin health.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-lg-5 col-md-12 mx-4 my-4 ">
              <Reveal>
                <div class="card d-flex align-items-center">
                  <img
                    src={cardImage2}
                    style={{ height: "265px", width: "265px" }}
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h5 class="card-title text-center">Accurate Results !</h5>
                    <p class="card-text text-center">
                      Rely on our state-of-the-art AI technology for precise and
                      reliable results. Our advanced algorithms analyze images
                      with exceptional accuracy, ensuring you receive
                      trustworthy information about your skin concerns.
                      Experience the power of AI-driven diagnostics for a more
                      informed and efficient approach to managing your skin
                      health.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-lg-5 col-md-12 mx-4 my-4 ">
              <Reveal>
                <div class="card d-flex align-items-center">
                  <img
                    src={cardImage3}
                    style={{ height: "265px", width: "265px" }}
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h5 class="card-title text-center">
                      Get Help From Doctors
                    </h5>
                    <p class="card-text text-center">
                      Connect with experienced dermatologists seamlessly through
                      our app. Gain valuable insights, personalized advice, and
                      treatment recommendations from licensed professionals. Our
                      platform ensures convenient and confidential communication
                      for a more informed and confident approach to your skin
                      care journey.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-lg-5 col-md-12 mx-4 my-4 ">
              <Reveal>
                <div class="card d-flex align-items-center">
                  <img
                    src={cardImage4}
                    style={{ height: "265px", width: "265px" }}
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h5 class="card-title text-center">Get Medication </h5>
                    <p class="card-text text-center">
                      Streamline your treatment process by accessing medication
                      recommendations directly within our app. Receive
                      personalized prescriptions and guidance on
                      over-the-counter remedies tailored to your specific skin
                      condition. Take the guesswork out of finding the right
                      solutions for your skin health needs.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default HomePage;