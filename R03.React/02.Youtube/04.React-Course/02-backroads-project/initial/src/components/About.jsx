import React from "react";
import Title from "../util/Title";
import aboutimg from "../assets/images/about.jpeg";

const About = () => {
  return (
    <section className="section">
      <Title title={"about"} subTitle={"us"} />
      <div className="section-center about-center">
        <div className="about-img">
          <img src={aboutimg} alt="awesome beach" className="about-photo" />
        </div>
        <article className="about-info">
          <h3> explore the different </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            sapiente quam veritatis, obcaecati deleniti aut dolorum odit maxime
            dolore placeat totam velit nam! Vero ipsum rerum quis eaque
            veritatis doloribus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni et
            repellat earum deleniti inventore ipsam minima quod exercitationem,
            repudiandae dolor, ratione dolores? Voluptatem quos, harum alias
            atque eos soluta temporibus!
          </p>
          <a href="#" className="btn">
            read more
          </a>
        </article>
      </div>
    </section>
  );
};

export default About;
