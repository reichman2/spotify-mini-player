// eslint-disable-next-line no-use-before-define
import React from 'react';
import PlayPause from '../PlayPause';
import SkipButton from '../SkipButton';

import './styles.scss';


/**
 * This class is a container for music controls.  These include the play/pause, 
 * skip, prev, shuffle, and queue buttons.
 */
class Controls extends React.Component {
    constructor() {
        super({});
    }

    render() {
        return (
            <>
                <div className="control-container">
                    <SkipButton buttonType="prev" />
                    <PlayPause playback="play" /> 
                    <SkipButton buttonType="next" />
                </div>
            </>
        );
    }

}

export default Controls;