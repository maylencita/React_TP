import * as React from 'react'
import { Link } from 'react-router-dom'

import ChannelSidebar from '../components/channelsSidebar'
import { User, Channel } from '../models'

interface LayoutProps {
  activeChannel: Channel
  appName: string
  children?: React.ReactNode
  serverStatus?: string
  user?: User
  channels: Array<Channel>
  // activeChannel: Channel
}

const layout = (props: LayoutProps) => {
  return (
    <div className="container">
      <div className="top_nav">
        <div className="app_title">
          <Link to="/addUser"> <h1>{props.appName}</h1> </Link>
          {
            (props.user && <div> [<span>{props.user.avatar}</span>] <span>{props.user.name}</span></div>) ||
          <div>[?_?] Anonymous</div> 
          }
        </div>
        <div className="chanel_header">
          <h2>{props.activeChannel.name}</h2>
        </div>
      </div>
      <div className="sidebar">
        <ChannelSidebar {...props}/>
      </div>
      <div className="primary_view">
        <div className="primary_view_container">
          {props.children}

          {/* <div className="messages_container">
            <div className="messages_body">Messages</div>
            <footer className="messages_footer">footer</footer>
          </div> */}

        </div>
      </div>

      {/* <div className="sideBar">
        <div className="sideBar_title">
          <Link to="/"> <h1>{props.appName}</h1> </Link>
          {props.user && <div> [<span>{props.user.avatar}</span>] <span>{props.user.name}</span></div>}
        </div>
        <ChannelSidebar {...props}/>
        {serverStatus &&
          <div className={`sideBar_serverstatus ${serverStatus}`}>
            <span>Server is {serverStatus}</span>
          </div>
        }
      </div>
      <div className="homeContainer">
        {props.children}
      </div>   */}
    </div>    
  )
}

export default layout