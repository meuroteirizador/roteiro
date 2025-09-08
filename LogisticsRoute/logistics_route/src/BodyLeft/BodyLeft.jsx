import { useState, useContext, useEffect } from "react";
import { nValues } from "../dt";
import { CustomersInfo } from "../Body.jsx";

function BodyLeft() {
  const [counting, setCounting] = useState(nValues);
  const c = useContext(CustomersInfo);

  function updateCustomerArray(val, i) {
    let vls;
    let arrayJustHere = [...c.customerInfo];

    if (vls !== "") {
      vls = c.normalize(val);
      arrayJustHere[i] = vls;
      c.setCustomerInfo([...arrayJustHere]);
    } else {
      arrayJustHere[(i = "")];
      c.setCustomerInfo([...arrayJustHere]);
    }
  }

  // function addInput() {
  //   setCounting((val) => [...val, counting.length + 1]);
  // }

  function deleteInput(idDel, val, i) {
    // const val = document.getElementById(idDel).value;
    document.getElementById(idDel).value = ""; //.remove();
    //removing value for the customerArray:

    let arrayJustHere = [...c.customerInfo];
    arrayJustHere[i] = "";
    // c.setCustomerInfo((e) => [...e, vls]);
    c.setCustomerInfo([...arrayJustHere]);
  }

  return (
    <section className="customers">
      <h1>Clientes Coleta</h1>
      <div id="inputs">
        {counting.map((val, ind) => {
          return (
            <div className="inputs" id={`input${ind}`} key={`input${ind}`}>
              <div className="inputsChild">
                <input
                  id={`inputLeft${ind}`}
                  type="text"
                  onChange={(e) => {
                    if (e.target.value != "") {
                      e.target.classList.add(c.normalize(e.target.value));
                      updateCustomerArray(e.target.value, ind);
                    } else {
                      // console.log("nada para salvar");
                      updateCustomerArray(e.target.value, ind);
                    }
                  }}
                  onInput={(e) => {
                    if (e.target.value != "") {
                      e.target.classList.add(c.normalize(e.target.value));
                      updateCustomerArray(e.target.value, ind);
                      e.target.classList.add(e.target.value);
                    } else {
                      // console.log("nada para salvar");
                      updateCustomerArray(e.target.value, ind);
                    }
                  }}
                />
                <svg
                  onClick={(e) =>
                    deleteInput(`inputLeft${ind}`, e.target.value, ind)
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  // width="16"
                  // height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      <div className="obs">
        <h1>Atenção!!</h1>
        <p>1. MB Engenhara: 416, 417 ou 407</p>
        <p>2. VILLENA: Apenas no Maelcio</p>
      </div>
      {/* <button className="add" onClick={() => addInput()}>
        +
      </button> */}
    </section>
  );
}

export default BodyLeft;
