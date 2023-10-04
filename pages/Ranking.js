import { useState, React } from "react"
import {motion} from "framer-motion"
import InferenceBar from "../components/Ranking/InferenceBar"
import DragNDrop from "../components/Ranking/DragNDrop"
import style from "../components/Ranking/Ranking.module.css"

const Ranking = () => {
  function updateData(newData) {
    setData(newData)
  }
  function updatePrompt(newPrompt) {
    setPrompt(newPrompt)
  }

  const [prompt, setPrompt] = useState('');
  const numAnswers = 4;
  const [data, setData] = useState([{"group":"group1", "items":[]},
                                    {"group":"group2", "items":[]},
                                    {"group":"group3", "items":[]},
                                    {"group":"group4", "items":[]},
                                    {"group":"Rank 1 (best)", "items":[]},
                                    {"group":"Rank 2", "items":[]},
                                    {"group":"Rank 3", "items":[]},
                                    {"group":"Rank 4 (worst)", "items":[]}]);
  return (
    <main
      className={`flex h-screen w-screen flex-col text-3xl text-white dark:text-white ` }
    >
      <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay:0.6, duration:0.6}}>
          <div className="flex h-full w-full mt-20">
            <div className={style.ranking_header}>
              <div className={style.ranking_title}>
                Ranking outputs
              </div>
              <InferenceBar data={data} numAnswers={numAnswers} updateData={updateData} updatePrompt={updatePrompt} prompt={prompt} />
              <DragNDrop data={data} numAnswers={numAnswers} prompt={prompt} updateData={updateData} updatePrompt={updatePrompt} />
            </div>
          </div>
          
      </motion.div>
    </main>
  );
}
export default Ranking;