import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { streamList } from "../../actions";

class StreamHome extends React.Component {
    componentDidMount() {
        this.props.streamList();
    }

    renderList = () => {
        return this.props.streams.map((stream) => {
            return (
                <div key={stream.id} className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">{stream.title}</h5>
                        <p className="card-text">{stream.description}</p>
                        <div>{this.renderButtons(stream)}</div>
                    </div>
                </div>
            );
        });
    };

    renderButtons = (stream) => {
        if (this.props.currentUserId === stream.userId) {
            return (
                <>
                    <Link
                        to={`/streams/edit/${stream.id}`}
                        className="btn btn-primary"
                    >
                        Edit
                    </Link>
                    <Link
                        to={`/streams/delete/${stream.id}`}
                        className="btn btn-danger ml-4"
                    >
                        Delete
                    </Link>
                </>
            );
        } else {
            return <></>;
        }
    };

    renderCreateButton = () => {
        if (this.props.isSignedIn) {
            return (
                <Link
                    to="/streams/new"
                    className="btn btn-primary mt-4 float-right"
                >
                    Create Stream
                </Link>
            );
        } else {
            return <></>;
        }
    };

    render() {
        return (
            <div className="container" style={{ marginTop: "50px" }}>
                {this.renderList()}
                {this.renderCreateButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
    };
};

export default connect(mapStateToProps, { streamList })(StreamHome);
