import React, { useEffect } from "react";
import "./Topbar.css";
import { Logout } from "@mui/icons-material";
import { useNavigate,Link } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/login")
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Shopping site admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Link onClick={handleClick}><Logout/></Link>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}