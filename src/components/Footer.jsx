import { Instagram, Github, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
      <nav>
        <h6 className="footer-title">Services</h6>
        <Link className="link link-hover">Branding</Link>
        <Link className="link link-hover">Design</Link>
        <Link className="link link-hover">Marketing</Link>
        <Link className="link link-hover">Advertisement</Link>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <Link className="link link-hover">About us</Link>
        <Link className="link link-hover">Contact</Link>
        <Link className="link link-hover">Jobs</Link>
        <Link className="link link-hover">Press kit</Link>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <Link to="https://github.com/jpjisan">
            <Github />
          </Link>
          <Link to="https://www.instagram.com/_jpjisan?igsh=MTJ4MzFvbmIwZ2o3cg%3D%3D&utm_source=qr">
            <Instagram />
          </Link>
          <Link to="https://www.instagram.com/_jpjisan?igsh=MTJ4MzFvbmIwZ2o3cg%3D%3D&utm_source=qr">
            <Facebook />
          </Link>
          <Link to="https://www.linkedin.com/in/skkutubuddin800/">
            <Linkedin />
          </Link>
        </div>
        <p className="mt-2">© 2025 Jp Jisan. All rights reserved.</p>
      </nav>
    </footer>
  );
}

export default Footer;
