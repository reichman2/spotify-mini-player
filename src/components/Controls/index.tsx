// eslint-disable-next-line no-use-before-define
import React from 'react';
import PlayPause from '../PlayPause';


class Controls extends React.Component {
    constructor() {
        super({});
    }

    render() {
        return (
            <>
                <div className="control-container">
                    <PlayPause playback="play" /> 
                </div>
            </>
        );
    }

}

export default Controls;