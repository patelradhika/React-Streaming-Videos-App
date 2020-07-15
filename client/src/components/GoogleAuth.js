import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client
                .init({
                    client_id:
                        "207092664757-uvebf9qed2omqc7v9105rg0kgsqmgn64.apps.googleusercontent.com",
                    scope: "email",
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderButton = () => {
        if (this.props.auth.isSignedIn) {
            return (
                <button
                    onClick={this.onSignOutClick}
                    className="navbar-item btn btn-danger"
                >
                    Sign Out
                </button>
            );
        } else {
            return (
                <button
                    onClick={this.onSignInClick}
                    className="navbar-item btn btn-danger"
                >
                    Sign In with Google
                </button>
            );
        }
    };

    render() {
        return <React.Fragment>{this.renderButton()}</React.Fragment>;
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
