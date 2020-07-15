import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { streamEdit, streamShow } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
    componentDidMount = () => {
        this.props.streamShow(this.props.match.params.id);
    };

    onSubmit = (formValues) => {
        this.props.streamEdit(this.props.match.params.id, formValues);
    };

    render = () => {
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }

        if (!this.props.isSignedIn) {
            return (
                <div
                    className="container"
                    style={{
                        textAlign: "center",
                        marginTop: "100px",
                    }}
                >
                    <h2>Please sign-in in order to edit this stream.</h2>
                </div>
            );
        } else if (this.props.currentUserId !== this.props.stream.userId) {
            return (
                <div
                    className="container"
                    style={{
                        textAlign: "center",
                        marginTop: "100px",
                    }}
                >
                    <h2>Access Denied to edit this stream.</h2>
                </div>
            );
        } else {
            return (
                <div className="container mt-4">
                    <h2>Edit a Stream</h2>
                    <StreamForm
                        initialValues={_.pick(
                            this.props.stream,
                            "title",
                            "description"
                        )}
                        onSubmit={this.onSubmit}
                    />
                </div>
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

export default connect(mapStateToProps, { streamEdit, streamShow })(StreamEdit);
