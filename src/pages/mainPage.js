import React from 'react';
import {useState,useEffect } from 'react';
import './mainPage.css';


let massNotice= [localStorage.getItem('mass') || "Добрый день" ].join(',').split(',');
let parameter=[localStorage.getItem('parameter')].join(',').split(',');
let massNew;

function MainPage() {
  
  const [colorFont, setColorFont] = useState((parameter[0] !=='') ? parameter[0] : 'blue');
  const [sizeText, setSizeText] = useState(parameter[0] !=='' ? +parameter[1] : 14 );
  const [weightText, setWeightText] = useState((parameter[0] !=='') ? +parameter[2] : 400);
  const [parameterVisible, setParameterVisible] = useState('none');
  
  const [ad, setAd] = useState([]);
  const [count, setCount] = useState( localStorage.getItem('value') || "" );
  const [valueChange, setValueChange] = useState();
  const [indexElementblock, setIndexElementblock] = useState();
  const [alertVisible, setAlertVisible] = useState('none');
  const [addMass, setAddMass] = useState([]);
  
useEffect(() => {
    massNew = massNotice.map((number,index) =>
    <div className="container-notice_block"  index={index} key={Math.random(number.toString().length*1)} >
     <p index={index} className="container-notice_items" 
        style={{color:colorFont,fontSize: +sizeText,fontWeight:+weightText}}>{number}</p>
        <div className="container-deleteChange">
          <button className="container-deleteChange__button" onClick={elemtIndex} >edit</button>
          <button className="container-deleteChange__button" onClick={deleteElement}>delete</button>
        </div>
    </div>
    ); 
  setAd(massNew);

  localStorage.setItem("parameter", [colorFont,sizeText,weightText]);
 
},[colorFont,sizeText,weightText]);
 

useEffect(() => {
  localStorage.setItem("value", count);
   if(localStorage.getItem('mass')===''){
    localStorage.setItem("mass", "Добрый день");
   }
   else{
    localStorage.setItem("mass", massNotice);
   }
},[count,addMass]);

function elemtIndex(e){
  setCount(e.target.parentElement.previousElementSibling.innerText)
  setValueChange(e.target.parentElement.previousElementSibling.attributes.index.value)
  document.querySelector('.container-add-notice__textarea').focus();
}


function elementDoom(){
  massNew = massNotice.map((number,index) =>
    <div className="container-notice_block"  index={index} key={Math.random(number.toString().length*1)} >
     <p index={index} className="container-notice_items" 
        style={{color:colorFont,fontSize:+sizeText,fontWeight:+weightText}}>{number}</p>
        <div className="container-deleteChange">
          <button className="container-deleteChange__button" onClick={elemtIndex} >edit</button>
          <button className="container-deleteChange__button" onClick={deleteElement}>delete</button>
        </div>
    </div>
    ); 
}

  function addNotice(){
    setAddMass(massNotice.push(count));
    elementDoom();
    setAd(massNew);
  }
  
  function deleteElement(e){
    setAlertVisible('block');
    setIndexElementblock(e.target.parentElement.parentElement.attributes.index.value)
  }

  function deletIndexElement(){
    setAlertVisible('none');
    setAddMass(massNotice.splice(indexElementblock,1))
    elementDoom();
    setAd(massNew);
  }

  function alertNone(){
    setAlertVisible('none');
  }

  function changeElement(){
    setAddMass(massNotice.splice(valueChange,1,count))
    elementDoom();
    setAd(massNew);
  }

function visibleParameter(){
  if(parameterVisible === "none"){
   
   setParameterVisible('flex');
   
  }
  else{
  setParameterVisible('none');
 
  }
}

useEffect(() => {
  document.documentElement.scrollTo({
    top: document.documentElement.clientHeight,
    behavior: 'smooth'
  });
},[parameterVisible]);

    return (
      <main className="MainPage">
        <div className="container-alert-block">
        <div className="container-alert" style={{display: alertVisible}}>
          <p className="alert-text">Удалить заметку ?</p>
          <div className="container-button">
            <button className="button-alert" onClick={deletIndexElement}>Да</button>
            <button className="button-alert" onClick={alertNone}>Нет</button>
          </div>
        </div>
        </div>
        <div className="container-notice" style={{height: document.documentElement.clientHeight < 560 ? "280px" : "500px" }}>{ad}</div>
        <div className="container-notice-footer">
        <div className="container-add-notice">
          <textarea className="container-add-notice__textarea" maxLength={50} value={count} onChange={e =>setCount(e.target.value)}></textarea>
        <div className="container-add-notice__button">
          <button className="container-add-notice__active" type="button" onClick={addNotice}> add </button>
          <button className="container-add-notice__active" type="button" onClick={changeElement}> edit </button>
        </div> 
         </div>
         <button className="button-parameter" type="button" onClick={visibleParameter}> parameter </button>
          <div className="container-parameter-notice" style={{display:parameterVisible}}>
          <div className="parameter-notice-container" >
          <label className="parameter-notice-label" >Размер текста</label>
          <select className="parameter-notice-select"  value={sizeText}  onChange={(e)=>setSizeText(e.target.value)}>
            <option defaultValue value="12">12</option>
            <option value="14">14</option>
            <option value="16">16</option> 
            <option value="18">18</option>
            <option value="20">20</option>
            <option value="22">22</option>
          </select>
          </div>
          <div className="parameter-notice-container">
          <label className="parameter-notice-label" >Цвет текста</label>
          <select className="parameter-notice-select"  value={colorFont} onChange={(e)=>setColorFont(e.target.value)}>
            <option defaultValue value="black">black</option>
            <option value="white">white</option>
            <option value="red">Red</option> 
            <option value="blue">blue</option>
          </select>
          </div>
          <div className="parameter-notice-container">
          <label className="parameter-notice-label" >Цвет текста</label>
          <select className="parameter-notice-select" value={weightText} onChange={(e)=>setWeightText(e.target.value)}>
            <option defaultValue value="400">400</option>
            <option value="100">100</option>
            <option value="700">700</option> 
            <option value="900">900</option>
          </select>
          </div>
          </div>
          </div>
      </main>
    );
  }
  
  export default MainPage;