// eslint-disable-next-line no-use-before-define
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';


export interface PlayPauseState {
    playback: "play"|"pause";
}

export interface PlayPauseProps extends PlayPauseState { }


class PlayPause extends React.Component<PlayPauseProps, PlayPauseState> {
    constructor(props: PlayPauseProps) {
        super(props);
        this.state = { playback: props.playback || "play" };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ playback: (this.state.playback === "play")? "pause" : "play" }); // toggle play and pause state on click
    }

    render() {
        return (
            <>
                <div className="play-pause-button" onClick={ () => this.handleClick() }>
                    <FontAwesomeIcon 
                        className={ this.state.playback + "-icon" } 
                        icon={ (this.state.playback === "play")? faPlay : faPause } 
                        size="1x" 
                    />
                </div>
            </>
        );
    }
}

export default PlayPause;