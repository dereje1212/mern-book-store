import React from "react";
import "./Banner.css"; // ✅ plain CSS import
import bannerImg from "../../../assets/banner.png";

const Banner = () => {
  return (
    <section className="banner">
      {/* Left: Text */}
      <div className="banner-content">
        <h1>New Releases This Week</h1>
        <p>
          It's time to update your reading list with some of the latest and
          greatest releases in the literary world. From heart-pumping thrillers
          to captivating memoirs, this week's new releases offer something for everyone.
        </p>
        <button className="subscribe-btn">Subscribe</button>
      </div>

      {/* Right: Image */}
      <div className="banner-image">
        <img src={bannerImg} alt="Book Banner" />
      </div>
    </section>
  );
};

export default Banner;
