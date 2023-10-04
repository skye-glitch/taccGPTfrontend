import React, {useEffect, useState} from "react";
import axios from 'axios';
import style from "./Ranking.module.css"

const InferenceBar = props => {
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    const textarea = document.querySelector('textarea')
    textarea.value = props.prompt===undefined?'':props.prompt
    setPrompt(props.prompt===undefined?'':props.prompt)
  }, [props.prompt])

  const handleSubmitPrompt = (e) => {
    e.preventDefault();

    const stateDuration = 1500;
    const pendingClassName = 'loading-btn--pending';
    const successClassName = 'loading-btn--success';
    const failClassName    = 'loading-btn--fail';
    const elem = document.getElementsByClassName("loading-btn-wrapper")[0].querySelector("button");
    elem.classList.add(pendingClassName);

    // for test locally only: http://localhost:9990/submit_prompt/
    axios.post('/TACC_GPT/submit_prompt/',{'prompt':prompt,'numAnswers':props.numAnswers, 'user':'Anonymous'}).then(res => {

    window.setTimeout(() => {
      elem.classList.remove(pendingClassName);
      const classNameToBeAdded = res.data.answers.length === props.numAnswers?successClassName:failClassName;
      elem.classList.add(classNameToBeAdded);
    
      window.setTimeout(() => {
        elem.classList.remove(classNameToBeAdded)
        console.assert(res.data.answers.length === props.numAnswers)
        let newData = JSON.parse(JSON.stringify(props.data));
        for(let i = 0; i < props.numAnswers*2; i++) {
          if(i < props.numAnswers/2) {
            newData[i] = {"group":"group"+i, "items":[]};
          } else if(i === props.numAnswers) {
            newData[i] = {"group":"Rank 1 (best)", "items":[]};
          } else if(i === props.numAnswers*2-1) {
            newData[i] = {"group":"Rank "+ String(props.numAnswers) +" (worst)", "items":[]};
          } else {
            newData[i] = {"group":"Rank "+String(i-props.numAnswers+1), "items":[]};
          }
        }
        for(let i = 0; i < props.numAnswers; i++) newData[i].items.splice(0,0,res.data.answers[i]);
        props.updateData(newData)
        props.updatePrompt(prompt)
      }, stateDuration);
    }, stateDuration);

      // console.assert(res.data.answers.length === props.numAnswers)
      // let newData = JSON.parse(JSON.stringify(props.data));
      // for(let i = 0; i < props.numAnswers*2; i++) {
      //   if(i < props.numAnswers/2) {
      //     newData[i] = {"group":"group"+i, "items":[]};
      //   } else if(i === props.numAnswers) {
      //     newData[i] = {"group":"Rank 1 (best)", "items":[]};
      //   } else if(i === props.numAnswers*2-1) {
      //     newData[i] = {"group":"Rank "+ String(props.numAnswers) +" (worst)", "items":[]};
      //   } else {
      //     newData[i] = {"group":"Rank "+String(i-props.numAnswers+1), "items":[]};
      //   }
      // }
      // for(let i = 0; i < props.numAnswers; i++) newData[i].items.splice(0,0,res.data.answers[i]);
      // props.updateData(newData)
      // props.updatePrompt(prompt)
    })
  }

  // function handleButtonAnimation(ev) {
  //   const stateDuration = 1500;
  //   const pendingClassName = 'loading-btn--pending';
  //   const successClassName = 'loading-btn--success';
  //   const failClassName    = 'loading-btn--fail';
  //   const elem = ev.target;
  //   elem.classList.add(pendingClassName);
    
  //   window.setTimeout(() => {
  //       elem.classList.remove(pendingClassName);
  //       elem.classList.add(successClassName);
      
  //       window.setTimeout(() => elem.classList.remove(successClassName), stateDuration);
  //   }, stateDuration);
  // }

  return (
    <div className={style.ranking_wrapper}>
      <div className={style.inference_wrapper} id="inference-wrapper">
        <form className="w-screen pb-[10px]" id="submit-prompt" onSubmit={handleSubmitPrompt}>
          <textarea className={style.inference_wrapper.textarea} type="text"
           placeholder="Please enter here"
           onChange={(e) => setPrompt(e.target.value)} 
           required/>
          <div className={style.loading_btn_wrapper}>
            <button className={`${style.loading_btn} `}>
              <span className={style.loading_btn__text}>
                Run
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InferenceBar;