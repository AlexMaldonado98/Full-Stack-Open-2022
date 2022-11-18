export interface HeaderProps{
    name:string
}
export const Header = (props:HeaderProps) => {
    return <p>{props.name}</p>
}
