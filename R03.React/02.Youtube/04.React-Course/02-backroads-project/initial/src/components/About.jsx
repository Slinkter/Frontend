import React from "react";
import Title from "./Title";
import aboutImg from "../images/about.jpeg";

const About = () => {
    return (
        <section className="section" id="about">
            <Title title="about" subTitle="us" />
            <div className="section-center about-center">
                <div className="about-img">
                    <img src={aboutImg} alt="" className="about-photo" />
                </div>
                <article className="about-info">
                    <h3>explore the diference</h3>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Harum et eum velit aliquam veniam voluptate fugiat
                        repudiandae maxime ullam. Assumenda reprehenderit aut et
                        sit numquam sapiente laudantium officiis alias
                        dignissimos.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Debitis tempora impedit, id est ab quod quasi quis
                        placeat laudantium, exercitationem dicta! Reiciendis
                        facere fuga molestias minima a obcaecati deserunt!
                        Repellendus!
                    </p>
                    <a href="" className="btn">
                        read more
                    </a>
                </article>
            </div>
        </section>
    );
};

export default About;
