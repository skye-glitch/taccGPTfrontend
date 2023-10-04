import React from "react";
import {motion} from "framer-motion";
import { useRouter } from "next/navigation";

function Database() {
  const router = useRouter();
  return (
   <motion.div className="database-container"
   initial={{opacity: 0}}
   animate={{opacity: 1}}
   transition={{delay:0.6, duration:0.6}}>
    <div className="database-wrapper">
      <div className="database-groups">
          <motion.div 
          className="database-group" 
          whileHover={{backgroundColor: "#7b2ff7", color: "#FFFFFF"}}
          onClick={()=>{router.push("/show_database_qa_pairs")}}>
            <h1>Click me to see all qa_pairs.</h1>
          </motion.div>

          <div className="separate"/>

          <motion.div 
          className="database-group" 
          whileHover={{backgroundColor: "#FF008C", color: "#FFFFFF"}}
          onClick={()=>{router.push("/show_database_rankings")}}>
            <h1>Click me to see all rankings.</h1>
          </motion.div>
      </div>
    </div>
   </motion.div>
  )
}



export default Database;