import React from "react";
import mamaritsLogo from "../assets/mamarits-logo.png";
import Image1 from "../assets/image1.png";
import Google_logo from "../assets/google-logo.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";

function About() {
  return (
  
    <div style={{ backgroundColor: "#fff", padding: "20px" }}>
      
      <div
        style={{
          backgroundColor: "#000",
          padding: "20px",
          color: "#fff",
          textAlign: "center",
        }}>
      
        <h1>About</h1>
      </div>

      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          padding: "20px",
          
        }}>
      
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ marginRight: "20px", width:"50%"}}>
            <h2><center>Mission</center></h2>
            <p>
              Mamarits is a family-owned and operated restaurant specializing in
              authentic Filippino cuisine. We pride ourselves on providing our
              customers with the finest ingredients and the most delicious dishes. Our
              mission is to create memorable experiences for our patrons, and we
              strive to deliver exceptional service and quality ingredients to our
              customers.
            </p>
          </div>

          <div style={{ width:"150px", }}>
            <img
              src={mamaritsLogo}
              alt="mamaritsLogo"
              style={{
                width: "100%",
                borderRadius: "8px",
                borderHeight: "30px",
                backgroundColor: "black",
              }}
            />
          </div>
        </div>
        

        <div>
          <div style={{ 
              display:"inline-block",
              width: "200px",
            
            }}>
            <h2> Food</h2>
            <img
              src={Image1}
              alt="Image1"
              style={{
                width: "200px",
                borderRadius: "8px",
                borderHeight: "30px",
                backgroundColor: "black",
                
              }}
            />

            <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit.
            Adipiscing consectetur vitae metus eu, augue adipiscing. 
            Conubia lacinia nulla dis nec pharetra in. Lacinia tellus 
            netus justo at pulvinar nec. Litora iaculis integer tortor 
            vivamus tellus?
            </p> 
          </div>
          <div style={{ 
            display:"inline-block",
            width: "200px",
          
            }}>
            <h2> Food</h2>
            <img
              src={Image2}
              alt="Image1"
              style={{
                width: "200px",
                height: "190px",
                borderRadius: "8px",
                borderHeight: "30px",
                backgroundColor: "black",
                
              }}
            />

            <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit.
            Adipiscing consectetur vitae metus eu, augue adipiscing. 
            Conubia lacinia nulla dis nec pharetra in. Lacinia tellus 
            netus justo at pulvinar nec. Litora iaculis integer tortor 
            vivamus tellus?
            </p> 
          </div>
          <div style={{ 
            display:"inline-block",
            width: "200px",
          
            }}>
            <h2> Food</h2>
            <img
              src={Image3}
              alt="Image1"
              style={{
                width: "200px",
                height: "190px",
                borderRadius: "8px",
                borderHeight: "30px",
                backgroundColor: "black",
                
              }}
            />

            <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit.
            Adipiscing consectetur vitae metus eu, augue adipiscing. 
            Conubia lacinia nulla dis nec pharetra in. Lacinia tellus 
            netus justo at pulvinar nec. Litora iaculis integer tortor 
            vivamus tellus?
            </p> 
          </div>
        </div>
  
      </div>
    </div>
    /*Lorem ipsum odor amet, consectetuer adipiscing elit. Justo lacus lacinia
    laoreet tempor; semper parturient habitant. Aliquam elit eu ipsum
    tortor praesent aliquet ultrices vestibulum.*/
            

);
}

export default About;
