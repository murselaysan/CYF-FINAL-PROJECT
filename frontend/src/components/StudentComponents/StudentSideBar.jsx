import React from 'react';
import Logo from "../../Assets/icons/user.png";
import StudentImage  from "../../Assets/images/student_page_logo.png";
import "./StudentSideBar.scss";

export default function StudentSideBar() {
    return (
        <div className = "container">
            <div className = "user_icon_container">
                <div className="user_icon_image">
                <img 
                
                alt = "user icon" 
                src ={Logo}/>
                </div>
                <p>Selina Hussain</p>
                <p>Student</p>
            </div><hr/>

            <div>
                <h2>Student Confident Tracker</h2>
            </div><hr/>
            <div>
                <img 
                alt = ""
                src = {StudentImage}
                />
            </div>
        </div>
    )
}
