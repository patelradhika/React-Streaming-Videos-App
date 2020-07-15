import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { streamDelete, streamShow } from "../../actions";
import Modal from "../Modal";
import history from "../../history";

class StreamDelete extends React.Component {
    componentDidMount = () => {
        this.props.streamShow(this.props.match.params.id);
    };

    renderActions = () => {
        const { id } = this.props.match.params;

        return (
            <React.Fragment>
                <button
                    onClick={() => this.props.streamDelete(id)}
                    className="btn btn-danger"
                >
                    Delete
                </button>
                <Link to="/" className="btn btn-secondary ml-4">
                    Close
                </Link>
            </React.Fragment>
        );
    };

    renderContent = () => {
        if (!this.props.stream) {
            return "Are you sure you want to delete this stream?";
        }

        return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
    };

    render = () => {
        if (!this.props.isSignedIn) {
            return (
                <div
                    className="container"
                    style={{ textAlign: "center", marginTop: "100px" }}
                >
                    <h2>Please sign-in in order to delete this stream.</h2>
                </div>
            );
        } else if (this.props.currentUserId !== this.props.stream.userId) {
            return (
                <div
                    className="container"
                    style={{ textAlign: "center", marginTop: "100px" }}
                >
                    <h2>Access Denied to delete this stream.</h2>
                </div>
            );
        } else {
            return (
                <Modal
                    onDismiss={() => history.push("/")}
                    title="Delete Stream"
                    description={this.renderContent()}
                    actions={this.renderActions()}
                />
            );
        }
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    };
};

export default connect(mapStateToProps, { streamDelete, streamShow })(
    StreamDelete
);
