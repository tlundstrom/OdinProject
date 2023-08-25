import React from "react";

export interface Props {
    componentTitle: string;
}

const ComponentTitle: React.FC<Props> = (props) =>{
    return (
        <h3>{props.componentTitle}</h3>
    )
}

export default ComponentTitle