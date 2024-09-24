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

  const getRandomQuestion = (e) => {
    e.preventDefault();

    var textarea = document.querySelector('textarea')

    const pendingClassName = style.loading_btn__pending;
    const successClassName = style.loading_btn__success;
    const failClassName    = style.loading_btn__fail;
    const elem = document.getElementById("random_question_btn").querySelector("button");
    elem.classList.add(pendingClassName);

    axios.get('/backend/get_random_question').then(res => {
      window.setTimeout(() => {
        elem.classList.remove(pendingClassName);
        const classNameToBeAdded = res.data.success?successClassName:failClassName;
        elem.classList.add(classNameToBeAdded);
      
        window.setTimeout(() => {
          elem.classList.remove(classNameToBeAdded)
          
          textarea.value = res.data.message
          setPrompt(res.data.message)
          
        }, 500);
    }, 500);})
  }


  const submitPrompt = (e) => {
    e.preventDefault();

    var form = document.querySelector('form');
    if(!form.checkValidity()) {
      var tmpSubmit = document.createElement('button')
      form.appendChild(tmpSubmit)
      tmpSubmit.click()
      form.removeChild(tmpSubmit)
    } else {
      const stateDuration = 1000;
      const pendingClassName = style.loading_btn__pending;
      const successClassName = style.loading_btn__success;
      const failClassName    = style.loading_btn__fail;
      const elem = document.getElementById("submit_prompt_btn").querySelector("button");
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
      console.log("get answers",res.data.answers[0]);
      console.log("compare length",res.data.answers.length, props.numAnswers)
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
        <form className="w-screen pb-[10px]" id="submit-prompt" >
          <textarea className={style.inference_wrapper.textarea} type="text"
           placeholder="Please enter here"
           onChange={(e) => setPrompt(e.target.value)} 
           required/>
          <div className={style.loading_btn_wrapper} id="random_question_btn">
            <button className={`${style.loading_btn} `} onClick={getRandomQuestion}>
              <span className={style.loading_btn__text}>
                Random question
              </span>
            </button>
          </div>
          <div className={`${style.loading_btn_wrapper}`} id='submit_prompt_btn'>
            <button className={`${style.loading_btn} `} onClick={submitPrompt}>
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