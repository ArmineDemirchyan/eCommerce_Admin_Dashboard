import React from 'react';
import "./Topbar.css";
//import {NotificationsNone,Language,Settings} from "@mui/icons-material"
const Topbar = () => {
  return (
    <div className="topbar">
    <div className="topbarWrapper">
      <div className="topLeft">
        <span className="logo">admin</span>
      </div>
      <div className="topRight">
        <div className="topbarIconContainer">
          <span className="topIconBadge">2</span>
        </div>
        <div className="topbarIconContainer">
          <span className="topIconBadge">2</span>
        </div>
        <div className="topbarIconContainer">
        </div>
        <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
      </div>
    </div>
  </div>
  )
}

export default Topbar