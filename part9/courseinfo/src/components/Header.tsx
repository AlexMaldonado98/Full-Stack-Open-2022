export interface HeaderProps{
    name:string
}
export const Header = (props:HeaderProps) => {
    return <h1><strong>{props.name}</strong></h1>
}
