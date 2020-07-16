import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { streamShow } from "../../actions";

class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount = () => {
        this.props.streamShow(this.props.match.params.id);
        this.buildPlayer();
    };

    componentDidUpdate = () => {
        this.buildPlayer();
    };

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer = () => {
        if (this.player || !this.props.stream || !this.videoRef.current) {
            return;
        }

        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: "flv",
            url: `http://localhost:8000/live/${id}.flv`,
        });
        console.log(this.player, this.videoRef.current);
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    };

    render = () => {
        if (!this.props.isSignedIn) {
            return (
                <div
                    className="container"
                    style={{
                        textAlign: "center",
                        marginTop: "100px",
                    }}
                >
                    <h2>Please sign-in in order to view this stream.</h2>
                </div>
            );
        } else if (!this.props.stream) {
            return <div className="container">Loading...</div>;
        } else {
            const { title, description } = this.props.stream;

            return (
                <div className="container" style={{ marginTop: "50px" }}>
                    <video
                        ref={this.videoRef}
                        style={{ width: "100%" }}
                        controls
                    />
                    <div className="mt-4">
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>
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

export default connect(mapStateToProps, { streamShow })(StreamShow);
