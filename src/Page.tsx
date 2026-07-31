import Content from './Content.tsx'
import Sidebar from './Sidebar.tsx'
export default function Page(props:any) {
    return (

    <div class="container">
        <div class="sidebar">
            <Sidebar onSelect={props.onNavigate}></Sidebar>
        </div>
        <div class="content">
            <Content path={props.path} onNavigate={props.onNavigate} refresh={props.refresh}></Content>
        </div>
    </div>
        
    )
}