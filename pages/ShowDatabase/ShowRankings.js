import axios from "axios";
import React, { useEffect, useState } from "react";
import {motion} from "framer-motion"
import style from "./table_styles.module.css"

function ShowRankings(){
  const [rankings, setRankings] = useState([]);

  useEffect(()=>{
    fetchData()
  }, [])

  const fetchData = async() =>{
    // http://localhost:9990/get_all_rankings
    axios.get("/backend/get_all_rankings").then(res => {
      // console.log(res.data.rankings)
      setRankings(res.data.rankings)
    })
  }

  function downloadDataJson(data, name="data.json") {
    const octData = new Blob([JSON.stringify(data)], {type: "octet-stream"})
    const octDataHref = URL.createObjectURL(octData);
    const a = Object.assign(document.createElement("a"),{
      href: octDataHref,
      download:name,
      style: "display:none"
    })
    document.body.appendChild(a)
  
    a.click()
    URL.revokeObjectURL(octDataHref)
    a.remove()
  }

  return (
    <motion.div className={style.rankings_container}
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{delay:0.8, duration:0.8}}>
      <div className={style.rankings_wrapper}>
        <motion.button className={style.motion_button}
        whileHover={{scale:1.1}}
        onClick={()=>downloadDataJson(rankings, "rankings.json")}>
          Download rankings.json
        </motion.button>
        <div className={style.table_wrapper}>
          
          <table className={style.fl_table}>
            <thead> 
              <tr >    
                <th>Index</th>
                <th>Date</th>
                <th>User</th>
                <th>Prompt</th>
                <th>Rank 1</th>
                <th>Rank 2</th>
                <th>Rank 3</th>
                <th>Rank 4</th>
              </tr>
            </thead> 

            <tbody>
              {console.log(rankings)}
              {rankings.map((element, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{element.date}</td>
                    <td>{element.user}</td>
                    <td>{element.prompt}</td>
                    {element.answers.map((answer,answerIdx)=>(
                      <td key={answerIdx}>{JSON.stringify(answer)}</td>
                    ))}
                  </tr>
              ))}
            </tbody>
        </table>
        </div>
      </div>
    </motion.div>
  )
}
export default ShowRankings;