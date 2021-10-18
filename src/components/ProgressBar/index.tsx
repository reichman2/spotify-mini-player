// eslint-disable-next-line no-use-before-define
import React from "react";


export interface ProgressBarProps {
    /**
     * The current progress of the progress bar in seconds.
     */
    currentProgress: number;

    /**
     * The max progress of the progress bar in seconds.
     */
    maxProgress: number;
}

class ProgressBar extends React.Component<ProgressBarProps> {
    constructor(props: ProgressBarProps) {
        super(props);
        this.state = props;
    }

    componentDidMount() {
        // TODO create an interval for increasing the progress bar each second.
    }

    render() {
        return (
            <>

            </>
        );
    }
}

export default ProgressBar;