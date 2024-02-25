import CNavbar from "./CNavbar";

const Report = () => {
  let betNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <>
      <CNavbar></CNavbar>
      <div style={{ marginTop: "20px", marginLeft: "100px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "500px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: " 240px",
            }}
          >
            <p>GameId</p>
            <input type="textbox" />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: " 150px",
              }}
            >
              <p>BetNumber</p>
              <select>
                {betNumber.map((i) => {
                  return <option>{i}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "500px",
            marginTop: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: " 240px",
            }}
          >
            <p>UserName</p>
            <input type="textbox" />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: " 150px",
              }}
            >
              <p>Date</p>
              <input type="date" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Report;
