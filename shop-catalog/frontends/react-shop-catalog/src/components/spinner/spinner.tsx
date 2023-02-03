import "./spinner.css";

export interface ISpinnerProps {
    color?: string;
}

export default function Spinner( { color = 'lightskyblue' }: ISpinnerProps ) {
    return (
        <div className="spinner" style={ { borderTopColor: color } }></div>
    );
}
