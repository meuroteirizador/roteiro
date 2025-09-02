import { useState, useContext, useEffect } from "react";
import {
  vehicle_plate,
  drivers,
  svgN,
  drivers2,
  dicVehicleDriver,
  info,
  mark,
} from "../dt";
import { CustomersInfo } from "../App";

function BodyRight() {
  const [color, setColor] = useState("black");
  const check = (ind, bool) => {
    setColor((prev) => ({
      ...prev,
      [ind]: prev[ind] === "green" ? "black" : "green",
    }));
    if (bool) {
      setColor((prev) => ({
        ...prev,
        [ind]: prev[ind] === "green" ? "black" : "green",
      }));
    }
  };

  const [vehicleDriver, setVehicleDriver] = useState(dicVehicleDriver);
  const handleDriverChange = (plate, newDriver) => {
    setVehicleDriver((prev) => ({
      ...prev,
      [plate]: newDriver,
    }));
  };

  // Obtenha o driverInfo E o setDriverInfo do contexto
  const {
    customerInfoRight,
    setCustomerInfoRight,
    normalize2,
    driverInfo,
    setDriverInfo, // ATENÇÃO: Adicione esta linha
  } = useContext(CustomersInfo);

  return (
    <section className="frame">
      {vehicle_plate.map((val, ind) => {
        return (
          <div className={val} id="dd" key={`vehicle${ind}`}>
            <div className="div1">
              <p className="driver1">1º</p>
              <select
                id={`driverOne${ind}`}
                name="driver"
                // O valor agora é lido do estado driverInfo
                value={driverInfo[val] ? driverInfo[val][0] : ""}
                onChange={(e) => {
                  // Use setDriverInfo para atualizar o estado
                  setDriverInfo((prevInfo) => {
                    const newInfo = { ...prevInfo };
                    newInfo[val] = newInfo[val] ? [...newInfo[val]] : [];
                    newInfo[val][0] = e.target.value;
                    return newInfo;
                  });
                }}
              >
                {drivers.map((val2, ind2) => {
                  return (
                    <option key={`driver${ind2}`} value={val2}>
                      {val2}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="div2">
              <p className="driver2">2º</p>
              <select
                name="driver"
                id={`driverTwo${ind}`}
                // O valor agora é lido do estado driverInfo
                value={driverInfo[val] ? driverInfo[val][1] : ""}
                onChange={(e) => {
                  // Use setDriverInfo para atualizar o estado
                  setDriverInfo((prevInfo) => {
                    const newInfo = { ...prevInfo };
                    newInfo[val] = newInfo[val] ? [...newInfo[val]] : [];
                    newInfo[val][1] = e.target.value;
                    return newInfo;
                  });
                }}
              >
                {drivers2.map((val2, ind2) => {
                  return (
                    <option key={`driver${ind2}`} value={val2}>
                      {val2}
                    </option>
                  );
                })}
              </select>
            </div>
            <p className="plate">{val}</p>
            {svgN.map((val3, ind3) => {
              return (
                <div className="inputText" key={ind3}>
                  <input
                    id={`${info[ind3]}${ind}`}
                    type="text"
                    // O valor agora é lido do estado driverInfo
                    value={driverInfo[val] ? driverInfo[val][ind3 + 3] : ""}
                    onBlur={(e) => {
                      const val = normalize2(e.target.value);
                      if (val && !customerInfoRight.includes(val)) {
                        setCustomerInfoRight((prev) => [...prev, val]);
                      }
                    }}
                    onChange={(e) => {
                      // Use setDriverInfo para atualizar o estado
                      setDriverInfo((prevInfo) => {
                        const newInfo = { ...prevInfo };
                        newInfo[val] = newInfo[val] ? [...newInfo[val]] : [];
                        newInfo[val][ind3 + 3] = e.target.value;
                        return newInfo;
                      });
                    }}
                  />
                  <svg
                    style={{}}
                    onClick={() => {
                      check(`${val3}${ind}`, driverInfo[val][ind3 + 8]),
                        setDriverInfo((prevInfo) => {
                          const newInfo = { ...prevInfo };
                          newInfo[val] = newInfo[val] ? [...newInfo[val]] : [];
                          newInfo[val][ind3 + 8] = !newInfo[val][ind3 + 8];
                          return newInfo;
                        });
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={color[`${val3}${ind}`] || "black"}
                    className="bi bi-check-all"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z" />
                  </svg>
                </div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}

export default BodyRight;
