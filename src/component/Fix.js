import { useState } from "react";
import CNavbar from "./CNavbar";
import { FIX_URL } from "./utils/Url";
import authHeader from "./utils/authHeader";

const Fix = () => {
  const [slot1, setSlot1] = useState(1);
  const [slot2, setSlot2] = useState(0);
  let slot1Option = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let slot2Option = ["N", "x2", "x3"];
  let slot2OptionIndex = [1, 2, 3];
  let headers = authHeader();
  //console.log(headers.get("authorization"));
  const slot1Handle = (slot1) => {
    setSlot1(slot1);
    console.log(slot1);
  };
  const slot2Handle = (slot2) => {
    setSlot2(slot2);
    console.log(slot2);
  };
  const submit = () => {
    var requestOptions = {
      method: "POST",
      mode: "cors",
      headers: headers,
      body: JSON.stringify({ slot1: slot1, slot2: slot2 }),
    };
    fetch("http://192.168.1.13:8071/slotmachine/admin/fix", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  //   useEffect(() => {

  //   }, []);

  return (
    <>
      <CNavbar></CNavbar>
      <div className="rechargebox">
        <div className="rechargeelement">
          <lable className="rechargelabel">Slot 1</lable>
          <select onChange={(e) => slot1Handle(e.target.value)}>
            {slot1Option.map((i) => {
              return <option value={i}>{i}</option>;
            })}
          </select>
        </div>
        <div className="rechargeelement">
          <lable className="rechargelabel"> Slot 2</lable>
          <select onChange={(e) => slot2Handle(e.target.value)}>
            {slot2OptionIndex.map((i) => {
              return <option value={i}>{slot2Option[i - 1]}</option>;
            })}
          </select>
        </div>
        <div className="rechargeelement">
          <button onClick={() => submit()}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default Fix;
