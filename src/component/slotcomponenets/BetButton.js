import "../../css/betbutton.css";




//const Option_button = document.querySelector(".Option_button");

const value_arr = [10,20,50,100,200,500,1000];
let button_val = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
let active_button=0;
const button_div = ["d1","d2","d3","d4","d5","d6","d7","d8","d9","d10","d11","d12"];
let points = [0,0,0,0,0,0,0,0,0,0,0,0];


window.addEventListener("DOMContentLoaded", (event) => {
  //console.log("hello");
  const p1 = document.getElementById("p1");
  console.log(p1);
  document.addEventListener('DOMContentLoaded', function () {
      p1.addEventListener('click', option_Button);
      p1.myParam = "p1";
  });
  
  
  const p2 = document.getElementById("p2");
  if(p2){p2.addEventListener('click', option_Button);
  p2.myParam = "p2";}
  
  const p3 = document.getElementById("p3");
  if(p3){p3.addEventListener('click', option_Button);
  p3.myParam = "p3";}
  
  const p4 = document.getElementById("p4");
  if(p4){p4.addEventListener('click', option_Button);
  p4.myParam = "p4";}
  
  const p5 = document.getElementById("p5");
  if(p5){p5.addEventListener('click', option_Button);
  p5.myParam = "p5";}
  
  const p6 = document.getElementById("p6");
  if(p6){p6.addEventListener('click', option_Button);
  p6.myParam = "p6";}
  
  const p7 = document.getElementById("p7");
  if(p7){p7.addEventListener('click', option_Button);
  p7.myParam = "p7";}
  
  const p8 = document.getElementById("p8");
  if(p8){p8.addEventListener('click', option_Button);
  p8.myParam = "p8";}
  
  const p9 = document.getElementById("p9");
  if(p9){p9.addEventListener('click', option_Button);
  p9.myParam = "p9";}
  
  const p10 = document.getElementById("p10");
  if(p10){p10.addEventListener('click', option_Button);
  p10.myParam = "p10";}
  
  const p11 = document.getElementById("p11");
  if(p11){p11.addEventListener('click', option_Button);
  p11.myParam = "p11";}
  
  const p12 = document.getElementById("p12");
  if(p12){p12.addEventListener('click', option_Button);
  p12.myParam = "p12";}
  
  // event listener for delete button
  
  const x1 = document.getElementById("x1");
  if(x1){x1.addEventListener('click', delete_Button);
  x1.myParam = "x1";}
  
  const x2 = document.getElementById("x2");
  if(x2){x2.addEventListener('click', delete_Button);
  x2.myParam = "x2";}
  
  const x3 = document.getElementById("x3");
  if(x3){x3.addEventListener('click', delete_Button);
  x3.myParam = "x3";}
  
  const x4 = document.getElementById("x4");
  if(x4){x4.addEventListener('click', delete_Button);
  x4.myParam = "x4";}
  
  const x5 = document.getElementById("x5");
  if(x5){x5.addEventListener('click', delete_Button);
  x5.myParam = "x5";}
  
  const x6 = document.getElementById("x6");
  if(x6){x6.addEventListener('click', delete_Button);
  x6.myParam = "x6";}
  
  const x7 = document.getElementById("x7");
  if(x7){x7.addEventListener('click', delete_Button);
  x7.myParam = "x7";}
  
  const x8 = document.getElementById("x8");
  if(x8){x8.addEventListener('click', delete_Button);
  x8.myParam = "x8";}
  
  const x9 = document.getElementById("x9");
  if(x9){x9.addEventListener('click', delete_Button);
  x9.myParam = "x9";}
  
  const x10 = document.getElementById("x10");
  if(x10){x10.addEventListener('click', delete_Button);
  x10.myParam = "x10";}
  
  const x11 = document.getElementById("x11");
  if(x11){x11.addEventListener('click', delete_Button);
  x11.myParam = "x11";}
  
  const x12 = document.getElementById("x12");
  if(x12){x12.addEventListener('click', delete_Button);
  x12.myParam = "x12";}
  
  const ub1 = document.getElementById("ub1");
  if(ub1){ub1.addEventListener('click', upper_Button);
  ub1.myParam = "ub1";}
  
  const ub2 = document.getElementById("ub2");
  if(ub2){ub2.addEventListener('click', upper_Button);
  ub2.myParam = "ub2";}
  
  const ub3 = document.getElementById("ub3");
  if(ub3){ub3.addEventListener('click', upper_Button);
  ub3.myParam = "ub3";}
  
  const ub4 = document.getElementById("ub4");
  if(ub4){ub4.addEventListener('click', upper_Button);
  ub4.myParam = "ub4";}
  
  const rb1 = document.getElementById("rb1");
  if(rb1){rb1.addEventListener('click', right_Button);
  rb1.myParam = "rb1";}
  
  const rb2 = document.getElementById("rb2");
  if(rb2){rb2.addEventListener('click', right_Button);
  rb2.myParam = "rb2";}
  
  const rb3 = document.getElementById("rb3");
  if(rb3){rb3.addEventListener('click', right_Button);
  rb3.myParam = "rb3";} 
  
  function oddbutton(){
      for(let i=1;i<=12;i=i+2){
        let button_id="p"+i;
        let Option_id= document.getElementById(button_id);
        let idx = parseInt(Option_id.id.substring(1));
        idx-=1;
        
        active_button++;
            
        //console.log("p"+idx+" is selected");
        button_val[idx] = (button_val[idx]+1)%(value_arr.length)
        points[idx]=value_arr[button_val[idx]];
        //console.log(points);
        
        displayLabel(idx, value_arr[button_val[idx]]);
      }
    }
    function evenbutton(){
      for(let i=2;i<=12;i=i+2){
        let button_id="p"+i;
        let Option_id= document.getElementById(button_id);
        let idx = parseInt(Option_id.id.substring(1));
        idx-=1;
        
        active_button++;
            
        //console.log("p"+idx+" is selected");
        button_val[idx] = (button_val[idx]+1)%(value_arr.length)
        points[idx]=value_arr[button_val[idx]];
        //console.log(points);
        
        displayLabel(idx, value_arr[button_val[idx]]);
      }
    }
    
    
    
    function upper_Button(button_param){
    
        let u_id = button_param.currentTarget.myParam;
        let b_id = document.getElementById(u_id);
        let idx = parseInt(b_id.id.substring(2));
        
        
        for(let i=0;i<3;i++){
          let c = i*4+idx;
          
          button_val[c-1] = (button_val[c-1]+1)%(value_arr.length)
          points[c-1]=value_arr[button_val[c-1]];
          displayLabel(c-1, value_arr[button_val[c-1]]);
          console.log(points)
        }
        
    }
    
    function right_Button(button_param){
    
    let u_id = button_param.currentTarget.myParam;
    let b_id = document.getElementById(u_id);
    let idx = parseInt(b_id.id.substring(2));
    
    
    for(let i=1;i<=4;i++){
      let c = i+(idx-1)*4;
      
      button_val[c-1] = (button_val[c-1]+1)%(value_arr.length)
      points[c-1]=value_arr[button_val[c-1]];
      displayLabel(c-1, value_arr[button_val[c-1]]);
      //console.log(points)
    }
    
    }
    
    function option_Button(button_param){
    console.log("Hellow");
    let button_id = button_param.currentTarget.myParam;
    let Option_id= document.getElementById(button_id);
    let idx = parseInt(Option_id.id.substring(1));
    idx-=1;
    
    active_button++;
        
    //console.log("p"+idx+" is selected");
    button_val[idx] = (button_val[idx]+1)%(value_arr.length)
    points[idx]=value_arr[button_val[idx]];
    //console.log(points);
    
    displayLabel(idx, value_arr[button_val[idx]]);
    }
    
    function displayLabel(idx, val){
        const lb_div = document.getElementById(button_div[idx]);
        const lb = document.createElement("div");
        lb.setAttribute('class',"Label_div");
    
        lb.setAttribute('id',button_div[idx]+"i");
        lb_div.innerHTML=``;
        lb.innerHTML=`<div id="${"l"+button_div[idx]}" class="labelelement">${val}</div>`;
        lb_div.appendChild(lb);
    }
    
    function delete_Button(button_param){
        let button_id = button_param.currentTarget.myParam;
        let Option_id= document.getElementById(button_id);
        let idx = parseInt(Option_id.id.substring(1));
        idx-=1;
        const lb_div = document.getElementById(button_div[idx]);
        lb_div.innerHTML=``;
        points[idx]=0;
        button_val[idx]=-1;
    }
});




  

const BetButton = () => {

    // const script = document.createElement("script");

    // script.src = "./betButtonScript.js";
    // script.async = true;

    // document.body.appendChild(script);
    console.log("Hellow")

    return( 
        <div className="middiv">

        <div className="quickbutton">
        <div className="qbutton">
            <button className="qb" id="evenbutn">Even</button>
        </div>
        <div className="qbutton" id="oddbutn">
            <button className="qb">Odd</button>
        </div>
        <div className="qbutton">
            <button className="qb">Red</button>
        </div>
        <div className="qbutton">
            <button className="qb">Black</button>
        </div>
        </div>
        <div className="AllOButton">
        <div className="layer0">
            <div className="uval" >
            <button className="upperval" id="ub1">⬇️</button>
            
            </div>
            <div className="uval" >
            <button className="upperval" style={{marginLeft: "2vw"}} id="ub2">⬇️</button>
            
            </div>
            <div className="uval" >
            <button className="upperval" style={{marginLeft: "1.7vw"}} id="ub3">⬇️</button>
            
            </div>
            <div className="uval">
            <button className="upperval" style={{marginLeft: "1.5vw"}} id="ub4">⬇️</button>
            
            </div>
        </div>
        <div className="layer1">
            <div className="buttonbox">
                <div className="a1" >
                    <button className="Option_button" id="p1">
                        <div className="buttonlabel">🍉
                            <div className="digit_text" >
                            1
                            </div>
                        </div>
                    </button>
                    
                </div>
                <div className="b1">
                    <div id="d1" className="labeldiv">

                    </div>
                    <div className="cancelbutton">
                        <button className="Option_Cancel" id="x1"></button>
                    </div>
                    
                </div>
            </div>
            <div className="buttonbox">
                <div className="a1">
                    <button className="Option_button" id="p2">
                        <div className="buttonlabel">🍗
                            <div className="digit_text" >
                            2
                            </div>
                        </div>
                    </button>
                    
                </div>
                <div className="b1">
                    <div id="d2" className="labeldiv">

                    </div>
                    <div className="cancelbutton">
                        <button className="Option_Cancel" id="x2"></button>
                    </div>
                </div>
            </div>
            <div className="buttonbox">
                <div className="a1" >
                    <button className="Option_button" id="p3">
                        <div className="buttonlabel">🍭
                            <div className="digit_text" >
                            3
                            </div>
                        </div>
                    </button>
                    
                </div>
                <div className="b1">
                    <div id="d3" className="labeldiv">

                    </div>
                    <div className="cancelbutton">
                        <button className="Option_Cancel" id="x3"></button>
                    </div>
                </div>

            </div>
            <div className="buttonbox">
                <div className="a1">
                    <button className="Option_button" id="p4">
                        <div className="buttonlabel">🍆
                            <div className="digit_text" >
                            4
                            </div>
                        </div>
                    </button>
                    
                </div>
                <div className="b1">
                    <div id="d4" className="labeldiv">

                    </div>
                    <div className="cancelbutton">
                        <button className="Option_Cancel" id="x4"></button>
                    </div>
                </div>
                
            </div>
            <div className="rval" style={{float:"right"}}>
            <button className="rightval" id="rb1">⬅️</button>
            
            </div>
        </div>


        <div className="layer2">
            <div className="buttonbox">
                <div className="a2" >
                    <button className="Option_button" id="p5">
                        <div className="buttonlabel">🍊
                            <div className="digit_text" >
                            5
                            </div>
                        </div>
                    </button>
                </div>
                <div className="b2">
                    <div id="d5" className="labeldiv">

                    </div>
                    <div className="cancelbutton">
                        <button className="Option_Cancel" id="x5"></button>
                    </div>
                </div>
            </div>
            <div className="buttonbox">
                <div className="a2">
                    <button className="Option_button" id="p6">
                        <div className="buttonlabel">⚔️
                            <div className="digit_text" >
                            6
                            </div>
                        </div>
                    </button>
                </div>
                <div className="b2">
                    <div id="d6" className="labeldiv">

                    </div>
                    <div className="cancelbutton">
                        <button className="Option_Cancel" id="x6"></button>
                    </div>
                </div>
            </div>
            <div className="buttonbox">
                <div className="a2" >
                    <button className="Option_button" id="p7">
                        <div className="buttonlabel">🍹
                            <div className="digit_text" >
                            7
                            </div>
                        </div>
                    </button>
                </div>
                <div className="b2">
                    <div id="d7" className="labeldiv">

                    </div>
                    <div className="cancelbutton">
                        <button className="Option_Cancel" id="x7"></button>
                    </div>
                </div>
            </div>
            <div className="buttonbox">
                <div className="a2">
                    <button className="Option_button" id="p8">
                        <div className="buttonlabel">🌽
                            <div className="digit_text" >
                            8
                            </div>
                        </div>
                    </button>
                </div>
                <div className="b2">
                    <div id="d8" className="labeldiv">

                    </div>
                    <div className="cancelbutton">
                        <button className="Option_Cancel" id="x8"></button>
                    </div>
                </div>
            </div>
            <div className="rval" style={{float:"right"}}>
            <button className="rightval" id="rb2">⬅️</button>
            
            </div>
        </div>

        <div className="layer3">
            <div className="buttonbox">
                <div className="a3" >
                    <button className="Option_button" id="p9">
                        <div className="buttonlabel">🍿
                            <div className="digit_text" >
                            9
                            </div>
                        </div>
                    </button>
                    
                </div>
                <div className="b3">
                    <div id="d9" className="labeldiv">

                    </div>
                    <div className="cancelbutton">
                        <button className="Option_Cancel" id="x9"></button>
                    </div>
                </div>
            </div>
            <div className="buttonbox">
                <div className="a3">
                    <button className="Option_button" id="p10">
                        <div className="buttonlabel">🧨
                            <div className="digit_text" >
                            10
                            </div>
                        </div>
                    </button>
                    
                </div>
                <div className="b3">
                    <div id="d10" className="labeldiv">

                    </div>
                    <div className="cancelbutton">
                        <button className="Option_Cancel" id="x10"></button>
                    </div>
                </div>
            </div>
            <div className="buttonbox">
                <div className="a3" >
                    <button className="Option_button" id="p11">
                        <div className="buttonlabel">☀️
                            <div className="digit_text" >
                            11
                            </div>
                        </div>
                    </button>
                </div>
                <div className="b3">
                    <div id="d11" className="labeldiv">

                    </div>
                    <div className="cancelbutton">
                        <button className="Option_Cancel" id="x11"></button>
                    </div>
                </div>
            </div>
            <div className="buttonbox">
                <div className="a3">
                    <button className="Option_button" id="p12">
                        <div className="buttonlabel">🛺
                            <div className="digit_text" >
                            12
                            </div>
                        </div>
                    </button>
                </div>
                <div className="b3">
                    <div id="d12" className="labeldiv">

                    </div>
                    <div className="cancelbutton">
                        <button className="Option_Cancel" id="x12"></button>
                    </div>
                </div>
                
            </div>
            <div className="rval" style={{float:"right"}}>
            <button className="rightval" id="rb3">⬅️</button>
            
            </div>
        </div>
        </div>
        <script></script>
</div>);
}

export default BetButton;