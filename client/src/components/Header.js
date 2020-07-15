import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

class Header extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <Link to="/" className="navbar-brand">
                        Streaming Videos
                    </Link>
                    <div>
                        <Link
                            to="/"
                            className="navbar-item navbar-link mr-4"
                            style={{ color: "white" }}
                        >
                            Streams
                        </Link>
                        <GoogleAuth />
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
