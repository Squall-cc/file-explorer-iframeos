import Icon from "./Icon.tsx"
export default function Entry(props) {
    let x = true
    if (props.type == "file") {
        x = false //icon.tsx props
    }

    return <div id="entry" onClick={props.onClick}>
        <Icon folder={x}></Icon>
        <div id="name">{props.name}</div>
        <div id="timestamp">{props.timestamp}</div>
    </div>
}