import React from 'react';
import { withRouter } from 'react-router';
import { useLocation } from 'react-router-dom';

import HomeIcon from '../icons/HomeIcon';
import AppointmentsIcon from '../icons/AppointmentsIcon';
import DoctorIcon from '../icons/DoctorIcon';

function Navbar(props) {

    const currentPath = useLocation().pathname.split('/')[1];

    function matchLocation(toMatch) {
        return toMatch === currentPath;
    }

    // Tailwind CSS classes added. 
    return (
        <div id="navbar" className="flex space-x-4 bg-gray-800 p-4">
            <button 
                className={`p-2 rounded ${matchLocation("") ? "bg-blue-500" : "bg-gray-700"} hover:bg-blue-700`}
                onClick={() => props.history.push("/")}
            >
                <HomeIcon size="30" className="text-white" />
            </button>
            <button 
                className={`p-2 rounded ${matchLocation("appointments") ? "bg-blue-500" : "bg-gray-700"} hover:bg-blue-700`}
                onClick={() => props.history.push("/appointments")}
            >
                <AppointmentsIcon size="30" className="text-white" />
            </button>
            <button 
                className={`p-2 rounded ${matchLocation("add") ? "bg-blue-500" : "bg-gray-700"} hover:bg-blue-700`}
                onClick={() => props.history.push("/add")}
            >
                <DoctorIcon size="30" className="text-white" />
            </button>
        </div>
    );
}

const NavbarWithRouter = withRouter(Navbar);
export default NavbarWithRouter;
