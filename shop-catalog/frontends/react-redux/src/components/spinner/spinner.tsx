import { ISpinnerProps } from "./model";

import "./spinner.css";

export default function Spinner( { color = "lightskyblue" }: ISpinnerProps ) {
    return (
        <div className="spinner" style={ { borderTopColor: color } }></div>
    );
}
