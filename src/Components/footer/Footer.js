import React from 'react';
import './Footer.css';


const Footer = () => {
    return (
        <footer className="bg-dark text-center text-white" >
            <div className="container p-1  mt-5">
                <section className="mb-0">
                    {/*  Facebook  */}
                    <a className="btn btn-outline-light btn-floating m-1" rel="noreferrer" target="_blank" href="https://www.facebook.com/guy.hasan" role="button">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    {/*  Google  */}
                    <a className="btn btn-outline-light btn-floating m-1" rel="noreferrer" target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=guy.hasan@gmail.com" role="button"
                    ><i className="fab fa-google"></i
                    ></a>

                    {/*  Linkedin  */}
                    <a className="btn btn-outline-light btn-floating m-1" rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/guy-hassan-790a43160/" role="button"
                    ><i className="fab fa-linkedin-in"></i
                    ></a>

                    {/* Github  */}
                    <a className="btn btn-outline-light btn-floating m-1" rel="noreferrer" target="_blank" href="https://github.com/guyhassan" role="button"
                    ><i className="fab fa-github"></i
                    ></a>
                </section>
            </div>
            <div className="text-center p-2">
                © 2021 Copyright
            <a rel="noreferrer" target="_blank" href="http://guy-hassan.herokuapp.com/" ><br />Guy Hassan</a>
            </div>
        </footer >
    )
}
export default Footer;