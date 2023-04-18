import React, { useRef } from "react";
import { CgSpinner } from "react-icons/cg";
import { useInView } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Carousel } from "flowbite-react";
import Rtx from "./img/rtx2060.jpg";
import RexusHeadset from "./img/headsetRexus.jpg";
import Lenovo from "./img/lenovo.png";
import Ryzen from "./img/amd-ryzen.png";

export default function Rightbar() {
  // set animation InView
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <>
      <div
        className="bg-white  flex justify-end mx-auto absolute right-0 top-20 invisible md:visible rounded-xl shadow-lg h-60 drop-shadow-xl lg:mr-6 xl:w-80 w-56 z-10 "
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateY(200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        <Carousel slideInterval={3000}>
          {/* Ads ke 1 */}
          <NavLink
            to="https://www.tokopedia.com/enterkomputer/zotac-geforce-rtx-3060-12gb-gddr6-twin-edge-lhr?extParam=ivf%3Dfalse%26src%3Dsearch"
            target="_blank"
          >
            <img
              src={Rtx}
              className="block h-60 xl:w-80 w-56 rounded-lg cursor-pointer"
              alt="..."
            />
          </NavLink>
          {/* Ads ke 2 */}
          <NavLink
            to="https://www.tokopedia.com/rexusid/rexus-headset-gaming-thundervox-hx9-putih?extParam=ivf%3Dfalse%26src%3Dsearch"
            target="_blank"
          >
            <img
              src={RexusHeadset}
              className="block h-60 xl:w-80 w-56 rounded-lg cursor-pointer"
              alt="..."
            />
          </NavLink>
          {/* Ads ke 3 */}
          <NavLink
            to="https://www.tokopedia.com/lenovolegion/lenovo-legion-pro-7i-rtx4080-i9-13900-32gb-2tbssd-w11-ohs-240hz-36id?extParam=whid%3D9894893"
            target="_blank"
          >
            <img
              src={Lenovo}
              className="block h-60 xl:w-80 w-56 rounded-lg cursor-pointer"
              alt="..."
            />
          </NavLink>
          {/* Ads ke 4 */}
          <NavLink to="https://www.amd.com/en/processors/ryzen" target="_blank">
            <img
              src={Ryzen}
              className="block h-60 xl:w-80 w-56 rounded-lg cursor-pointer"
              alt="..."
            />
          </NavLink>
        </Carousel>
      </div>

      <div
        className="bg-white  flex justify-end mx-auto absolute right-0 top-[350px] invisible md:visible rounded-xl shadow-lg h-auto drop-shadow-xl lg:mr-6 xl:w-80 w-56 z-10 p-5"
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateY(200px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
      >
        <div className="container  ml-2">
          <label className="mt-10 text-lg font-medium text-dark">
            About Techware
          </label>
          <main className="mx-auto max-w-7xl ">
            <div className="flex flex-col justify-start ">
              <p className="font-normal text-sm">
                Techware merupakan forum yang membahas mengenai hardware dan
                juga software
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
