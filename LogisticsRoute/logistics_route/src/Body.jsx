import { useState, createContext, useEffect } from "react";
import BodyLeft from "./BodyLeft/BodyLeft.jsx";
import BodyRight from "./BodyRight/BodyRight.jsx";
import { supabase } from "./supabaseClient";
import { driverAndVehicle, driverAndVehicle2 } from "./dt.js";

export const CustomersInfo = createContext();

function Body() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [customerInfo, setCustomerInfo] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [customerInfoRight, setCustomerInfoRight] = useState([]);

  const [driverInfo, setDriverInfo] = useState(driverAndVehicle);

  const [customer, setCustomer] = useState([...customerInfo]);

  function tst() {
    console.log(driverInfo);
  }

  useEffect(() => {
    setCustomer([...customerInfo]);
  }, [customerInfo]);

  const normalize = (val) => {
    for (let i = 1; i < 5; i++) {
      return val.trim().replace(/ /g, "_");
    }
  };

  const normalize2 = (val) => {
    for (let i = 1; i < 5; i++) {
      return val.trim().replace(/_/g, " ");
    }
  };

  function aux() {
    const inputLeft = document.querySelectorAll(".inputsChild");
    inputLeft.forEach((e) => {
      const firstSon = e.firstElementChild;
      const val = normalize2(firstSon.value);
      if (customerInfoRight.includes(val)) {
        firstSon.style.backgroundColor = "#2f143e";
        firstSon.style.color = "white";
      } else {
        firstSon.style.backgroundColor = "white";
        firstSon.style.color = "black";
      }
    });
  }

  function aux2() {
    const allDivs = document.querySelectorAll(".inputText");

    allDivs.forEach((son) => {
      const v = son.querySelectorAll("input");
      v.forEach((input) => {
        setTimeout(() => {
          input.focus();
          input.blur();
        }, 5);
      });
    });
  }

  useEffect(() => {
    aux();
  }, [customer, customerInfo, customerInfoRight]);

  function blurAllInputs() {
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach((input) => input.blur());
  }

  async function addCustomer() {
    blurAllInputs();

    await new Promise((resolve) => setTimeout(resolve, 50));

    const { error: deleteError } = await supabase
      .from("customersNew")
      .delete()
      .eq("date", date);

    if (deleteError) {
      console.error("Erro ao deletar registros existentes:", deleteError);
      return;
    }

    const { data: insertedData, error } = await supabase
      .from("customersNew")
      .insert([
        {
          customer1: customer[0],
          customer2: customer[1],
          customer3: customer[2],
          customer4: customer[3],
          customer5: customer[4],
          customer6: customer[5],
          customer7: customer[6],
          customer8: customer[7],
          customer9: customer[8],
          customer10: customer[9],
          customer11: customer[10],
          customer12: customer[11],
          customer13: customer[12],
          customer14: customer[13],
          customer15: customer[14],
          customer16: customer[15],
          customer17: customer[16],
          customer18: customer[17],
          customer19: customer[18],
          customer20: customer[19],
          customer21: customer[20],
          customer22: customer[21],
          customer23: customer[22],
          customer24: customer[23],
          date: date,
        },
      ]);

    if (error) {
      console.error("Erro ao inserir customersNew:", error);
    } else {
      await addData();
    }
  }

  async function addData() {
    const { error: deleteError } = await supabase
      .from("dataAll")
      .delete()
      .eq("date", date);

    if (deleteError) {
      console.error("Erro ao deletar registros existentes:", deleteError);
      return;
    }

    const insertData = Object.keys(driverInfo).map((key) => {
      const customer = driverInfo[key];
      return {
        date: date,
        firstDriver: customer[0],
        secondDriver: customer[1],
        vehiclePlate: customer[2],
        infoOne: customer[3],
        infoTwo: customer[4],
        infoThree: customer[5],
        infoFour: customer[6],
        infoFive: customer[7],
        infoOneMark: customer[8],
        infoTwoMark: customer[9],
        infoThreeMark: customer[10],
        infoFourMark: customer[11],
        infoFiveMark: customer[12],
      };
    });

    const { data: insertedData, error } = await supabase
      .from("dataAll")
      .insert(insertData);

    if (error) {
      console.error("Erro ao inserir:", error);
    } else {
      console.log("Clientes inseridos:", insertedData);
      window.alert("Dados inseridos com sucesso!");
      window.location.reload();
    }
  }

  async function selectCustomer() {
    const { data: selectData, error } = await supabase
      .from("customersNew")
      .select(
        `customer1, customer2, customer3, customer4, customer5, customer6, customer7, customer8, customer9, customer10, customer11, customer12, customer13, customer14, customer15, customer16, customer17, customer18, customer19, customer20, customer21, customer22, customer23, customer24`
      )
      .eq("date", date);

    if (error) {
      console.error("Erro ao selectionar:", error);
    } else {
      const values = selectData.flatMap((row) =>
        Object.values(row).filter((val) => val !== null && val !== "")
      );
      setCustomerInfo(values);

      for (let i = 0; i < 24; i++) {
        const el = document.getElementById(`inputLeft${i}`);
        el.value = "";
      }
      for (let i = 0; i < 24; i++) {
        const el = document.getElementById(`inputLeft${i}`);
        if (values[i]) {
          el.value = normalize2(values[i]);
        }
      }
    }

    setTimeout(() => {
      selectDataAll();
    }, 100);

    setTimeout(() => {
      aux2();
    }, 1000);
  }

  function hideOrShow() {
    const psw = document.getElementById("pwd");
    if (psw.type === "password") {
      psw.type = "text";
    } else {
      psw.type = "password";
    }
  }
  async function selectDataAll() {
    const newDriverInfo = JSON.parse(JSON.stringify(driverAndVehicle));

    const { data: selectData, error } = await supabase
      .from("dataAll")
      .select(
        `firstDriver,
      secondDriver,
      vehiclePlate,
      infoOne,
      infoTwo,
      infoThree,
      infoFour,
      infoFive,
      infoOneMark,
      infoTwoMark,
      infoThreeMark,
      infoFourMark,
      infoFiveMark`
      )
      .eq("date", date);

    if (error) {
      console.error("Erro ao selecionar:", error);
      setDriverInfo(newDriverInfo);
      return;
    }

    if (selectData && selectData.length > 0) {
      selectData.forEach((row) => {
        const plate = row.vehiclePlate;
        if (newDriverInfo[plate]) {
          newDriverInfo[plate][0] = row.firstDriver;
          newDriverInfo[plate][1] = row.secondDriver;
          newDriverInfo[plate][2] = row.vehiclePlate;
          newDriverInfo[plate][3] = row.infoOne;
          newDriverInfo[plate][4] = row.infoTwo;
          newDriverInfo[plate][5] = row.infoThree;
          newDriverInfo[plate][6] = row.infoFour;
          newDriverInfo[plate][7] = row.infoFive;
          newDriverInfo[plate][8] = row.infoOneMark;
          newDriverInfo[plate][9] = row.infoTwoMark;
          newDriverInfo[plate][10] = row.infoThreeMark;
          newDriverInfo[plate][11] = row.infoFourMark;
          newDriverInfo[plate][12] = row.infoFiveMark;
        }
      });
    }

    setDriverInfo(newDriverInfo);
  }

  function checkPwd() {
    const pwd = document.getElementById("pwd").value;

    if (pwd != "roteiro.123") {
      document.getElementsByClassName("errorPsw")[0].style.display = "flex";
      console.log("senha incorreta, verifique e tente novamente!");
    } else {
      document.getElementsByClassName("password")[0].style.display = "none";
      addCustomer();
    }
  }

  return (
    <CustomersInfo.Provider
      value={{
        customerInfo,
        setCustomerInfo,
        setCustomer,
        customerInfoRight,
        setCustomerInfoRight,
        aux,
        aux2,
        normalize,
        normalize2,
        driverInfo,
        setDriverInfo,
      }}
    >
      <div className="password">
        <div className="innerElements">
          <div className="inputs">
            <input
              type="password"
              id="pwd"
              name="pwd"
              placeholder="Digite a senha"
            />
            <input
              className="checkbox"
              type="checkbox"
              onClick={() => hideOrShow()}
            />
          </div>
          <div className="btts">
            <button
              onClick={() => {
                (document.getElementsByClassName("password")[0].style.display =
                  "none"),
                  (document.body.style.overflow = "auto"),
                  (document.getElementById("pwd").value = ""),
                  (document.getElementsByClassName(
                    "errorPsw"
                  )[0].style.display = "none");
              }}
            >
              Cancelar
            </button>
            <button class="bttPassword" onClick={() => checkPwd()}>
              Enviar
            </button>
          </div>
          <p className="errorPsw">Senha incorreta</p>
        </div>
      </div>

      <div className="dts">
        <input
          type="date"
          className="date"
          id="actualDate"
          value={date}
          onChange={(e) => {
            setDate(e.target.value) /*, selectCustomer(), selectDataAll()*/;
          }}
        />
        <div className="buttons">
          <button
            id="insertData"
            /*onClick={addCustomer}*/ onClick={() => {
              (document.getElementsByClassName("password")[0].style.display =
                "flex"),
                (document.body.style.overflow = "hidden");
            }}
          >
            Cadastrar
          </button>
          <button id="selectData" onClick={selectCustomer}>
            Buscar
          </button>
        </div>
      </div>
      <div className="body">
        <BodyLeft
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
        />
        <BodyRight />
      </div>
      <footer>
        © 2025 <a href="jorge_william92@hotmail.com">Jorge William</a>. Todos os
        direitos reservados
      </footer>
    </CustomersInfo.Provider>
  );
}

export default Body;
