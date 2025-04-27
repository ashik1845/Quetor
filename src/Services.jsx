import React from "react";
import Demo from "./Demo";
import ServiceGetIn from "./Service-getin";
import Servicehead from "./Servicehead";
import Serve from "./Serve";
import Footer from "./Footer";




function Services() {
    return (
        <div>
        <Servicehead/>
         <Serve/>  
        <Demo/>
            <ServiceGetIn/>
            <Footer/>
        </div>
    )
}
export default Services;