import React from "react";
import { pageLinks, socialLinks } from "../data";
import PageLiks from "../util/PageLiks";
import SocialLink from "../util/SocialLink";

const Footer = () => {
  return (
    <footer className="section footer">
      <PageLiks parentClass="footer-links" itemClass="footer-link" />
      <ul className="footer-icons">
        {socialLinks.map((link) => {
          return (
            <SocialLink key={link.id} {...link} itemClass={"footer-icon"} />
          );
        })}
      </ul>
      <p className="copyright">
        copyright &copy; Backroads travel tours company
        <span>{new Date().getFullYear()}</span>. all rights reserved
      </p>
    </footer>
  );
};

export default Footer;
