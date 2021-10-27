// eslint-disable-next-line no-use-before-define
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';


export interface SkipButtonProps {
    buttonType: "prev"|"next";
}

class SkipButton extends React.Component<SkipButtonProps> {
    constructor (props: SkipButtonProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // TODO implement skip and prev behavior and use based on buttonType
    }

    render() {
        return (
            <>
                <div className={ "skip skip-" + this.props.buttonType } onClick={ () => this.handleClick() }>
                    <FontAwesomeIcon 
                        icon={ (this.props.buttonType === "prev")? faStepBackward : faStepForward }
                    />
                </div>
            </>
        );
    }
}


export default SkipButton;