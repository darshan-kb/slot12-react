import anime from "animejs";
import React from "react";
import { useEffect } from "react";
import '../css/Wheel.css'

const rouletteNumberMap = new Map([
  [0,0],
  [28,1],
  [30,2],
  [5,3],
  [4,4],
  [16,5],
  [15,6],
  [14,7],
  [23,8],
  [35,9],
  [2,10],
  [9,11],
  [36,12],
  [26,13],
  [27,14],
  [29,15],
  [17,16],
  [1,17],
  [6,18],
  [21,19],
  [20,20],
  [8,21],
  [12,22],
  [32,23],
  [24,24],
  [11,25],
  [7,26],
  [34,27],
  [33,28],
  [10,29],
  [18,30],
  [25,31],
  [22,32],
  [13,33],
  [3,34],
  [19,35],
  [31,36]
]);

const rouletteWheelNumbers = [
  0,
  32,
  15,
  19,
  4,
  21,
  2,
  25,
  17,
  34,
  6,
  27,
  13,
  36,
  11,
  30,
  8,
  23,
  10,
  5,
  24,
  16,
  33,
  1,
  20,
  14,
  31,
  9,
  22,
  18,
  29,
  7,
  28,
  12,
  35,
  3,
  26
];


const Wheel = () => {
  
  var totalNumbers = 37;
  var singleSpinDuration = 5000;
  var singleRotationDegree = 360 / totalNumbers;
  var lastNumber = 0;

  //var rouletteWheelNumbers = rouletteData;
  //console.log(rouletteData);
  //console.log(number);
  const getRouletteIndexFromNumber = (number) => {
    return rouletteWheelNumbers[parseInt(number)];
  };
  const nextNumber = (number) => {
    var value = number;
    return value;
  };
  const getRotationFromNumber = (number) => {
    var index = getRouletteIndexFromNumber(number);
    return singleRotationDegree * index;
  };

  // rotateTo randomizes the end outcome of the wheel
  // so it doesn't only end at 0 at the top
  const getRandomEndRotation = (minNumberOfSpins, maxNumberOfSpins) => {
    var rotateTo = anime.random(
      minNumberOfSpins * totalNumbers,
      maxNumberOfSpins * totalNumbers
    );

    return singleRotationDegree * rotateTo;
  };
  // calculating where the zero will be at the end of the spin
  // because we are spinning it counter clockwise we are substracting it of 360
  const getZeroEndRotation = (totalRotaiton) => {
    var rotation = 360 - Math.abs(totalRotaiton % 360);

    return rotation;
  };
  // Where the ball end position should be
  // we are calculating this based on the zero rotation
  // and how much the wheel spins
  const getBallEndRotation = (zeroEndRotation, currentNumber) => {
    return Math.abs(zeroEndRotation) + getRotationFromNumber(currentNumber);
  };
  // randomizing the number of spins that the ball should make
  // so every spin is different
  const getBallNumberOfRotations = (minNumberOfSpins, maxNumberOfSpins) => {
    var numberOfSpins = anime.random(minNumberOfSpins, maxNumberOfSpins);
    return 360 * numberOfSpins;
  };

  function spinWheel(number) {
    //console.log("number "+number);
    const bezier = [0.165, 0.84, 0.44, 1.005];
    var ballMinNumberOfSpins = 2;
    var ballMaxNumberOfSpins = 4;
    var wheelMinNumberOfSpins = 2;
    var wheelMaxNumberOfSpins = 4;

    var currentNumber = nextNumber(number);

    var lastNumberRotation = getRotationFromNumber(lastNumber.toString()); //anime.get(wheel, "rotate", "deg");

    // minus in front to reverse it so it spins counterclockwise
    var endRotation = -getRandomEndRotation(
      ballMinNumberOfSpins,
      ballMaxNumberOfSpins
    );
    var zeroFromEndRotation = getZeroEndRotation(endRotation);
    var ballEndRotation =
      getBallNumberOfRotations(wheelMinNumberOfSpins, wheelMaxNumberOfSpins) +
      getBallEndRotation(zeroFromEndRotation, currentNumber);

    // reset to the last number
    anime.set([".layer-2", ".layer-4"], {
      rotate: function () {
        return lastNumberRotation;
      }
    });
    // reset zero
    anime.set(".ball-container", {
      rotate: function () {
        return 0;
      }
    });

    anime({
      targets: [".layer-2", ".layer-4"],
      rotate: function () {
        return endRotation; // random number
      },
      duration: singleSpinDuration, // random duration
      easing: `cubicBezier(${bezier.join(",")})`,
      complete: function (anim) {
        lastNumber = currentNumber;
      }
    });
    // aniamte ball
    anime({
      targets: ".ball-container",
      translateY: [
        { value: 0, duration: 2000 },
        { value: 20, duration: 1000 },
        { value: 25, duration: 900 },
        { value: 50, duration: 1000 }
      ],
      rotate: [{ value: ballEndRotation, duration: singleSpinDuration }],
      loop: 1,
      easing: `cubicBezier(${bezier.join(",")})`
    });
  }

    useEffect(()=>{
        let sse = new EventSource("http://localhost:9090/sse");
        sse.onmessage = (response) => {
            let resp = JSON.parse(response.data);
            if(resp.payloadName==="result"){
                spinWheel(rouletteNumberMap.get(parseInt(resp.payloadValue)));
            }
         }
    })

  return (
    <div className={"roulette-wheel"}>
      <div
        className={"layer-2 wheel"}
        style={{ transform: "rotate(0deg)" }}
      ></div>
      <div className={"layer-3"}></div>
      <div
        className={"layer-4 wheel"}
        style={{ transform: "rotate(0deg)" }}
      ></div>
      <div className={"layer-5"}></div>
      <div className={"ball-container"} style={{ transform: "rotate(0deg)" }}>
        <div
          className={"ball"}
          style={{ transform: "translate(0, -163.221px)" }}
        ></div>
      </div>
      {/* <svg width="380" height="380">
        <circle cx="190" cy="190" r="190" style={{touch-action: 'none'}}></circle>
      </svg> */}
    </div>
  );
};
//Wheel(0);
export default Wheel;
