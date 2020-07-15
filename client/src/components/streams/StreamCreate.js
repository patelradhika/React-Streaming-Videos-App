import React from "react";
import { connect } from "react-redux";
import { streamCreate } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
    onSubmit = (formValues) => {
        this.props.streamCreate(formValues);
    };

    render() {
        return (
            <div className="container mt-4">
                <h2>Create a Stream</h2>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(null, { streamCreate })(StreamCreate);
