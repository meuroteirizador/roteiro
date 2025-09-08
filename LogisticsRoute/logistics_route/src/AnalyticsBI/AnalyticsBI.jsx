import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AnalyticsBI() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [dayTotalAVG, setDayTotalAVG] = useState([]);
  const [monthTotalAVG, setMonthTotalAVG] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  function changeYear(y) {
    setYear(y);
  }

  useEffect(() => {
    if (year) {
      getDayTotal();
    }
  }, [year]);

  async function getDayTotal() {
    const { data: selectData1, error } = await supabase
      .from("customer_stats")
      .select(`*`)
      .eq("ano", year);

    if (!selectData1 || selectData1.length === 0) {
      console.warn(`Nenhum dado encontrado para o ano ${year}`);
      setDayTotalAVG([]);
      setMonthTotalAVG([]);
      setMaintenance([]);
      window.alert(`Nenhum dado encontrado para o ano selecionado ${year}`);
      return;
    } else {
      setDayTotalAVG(selectData1 || []);
    }
    getMothTotal();
  }
  async function getMothTotal() {
    const { data: selectData2, error } = await supabase
      .from("customer_stats_mensal")
      .select(`*`)
      .eq("ano", year);

    if (!selectData2 || selectData2.length === 0) {
      console.warn(`Nenhum dado mensal encontrado para o ano ${year}`);
      setMonthTotalAVG([]);
      setMaintenance([]);
      return;
    } else {
      setMonthTotalAVG(selectData2 || []);
    }
    getMaintenance();
  }

  async function getMaintenance() {
    const { data: selectData3, error } = await supabase
      .from("manutencoes_por_placa")
      .select(`*`)
      .eq("ano", year);

    if (!selectData3 || selectData3.length === 0) {
      console.warn(`Nenhuma manutenção encontrada para o ano ${year}`);
      setMaintenance([]);
      return;
    } else {
      // const values = selectData.filter((v) => v.ano === year);
      setMaintenance(selectData3 || []);
    }
  }

  const placasExcluir = ["KCR-4911", "BWP-0646", "DDS-3C26"];
  const maintenanceFiltrada = maintenance.filter(
    (item) => !placasExcluir.includes(item.vehiclePlate)
  );

  return (
    <section className="analyticsSection">
      <Link to="/roteiro/">
        <div className="goBack">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width="32"
            // height="32"
            fill="currentColor"
            class="bi bi-caret-left-fill"
            viewBox="0 0 16 16"
          >
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
          </svg>
          <h2>Voltar</h2>
        </div>
      </Link>
      <div className="graficHead">
        <h1>Painel de Operações Logísticas - BI</h1>
        <select onChange={(e) => changeYear(Number(e.target.value))}>
          <option value=""></option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
        </select>
      </div>
      <div className="graphs">
        <div className="gra1">
          <h2>Ranking de dias em manutenção por Veículo - Ano {year}</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={maintenanceFiltrada}
              layout="vertical"
              margin={{ top: 40, right: 15, left: 30, bottom: -20 }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis
                type="number"
                tick={{
                  fill: "black",
                  fontSize: 13,
                  textAnchor: "end",
                }}
              />
              <YAxis
                type="category"
                dataKey="vehiclePlate"
                tick={{
                  fill: "black",
                  fontSize: 10,
                  textAnchor: "end",
                }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="qtd_manutencoes" fill="#6279B8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="graphs2">
          <div className="gra2">
            <h2>{`% Coletas mensal - Ano ${year}`}</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthTotalAVG}
                layout="horizontal"
                margin={{ top: 15, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis
                  type="category"
                  dataKey="mes"
                  tick={{
                    fill: "black",
                    fontSize: 13,
                    textAnchor: "middle",
                    angle: "0",
                  }}
                />
                <YAxis
                  type="number"
                  tick={{
                    fill: "black",
                    fontSize: 13,
                  }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="percentual_no_ano" fill="#7B8DA3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="gra2">
            <h2>{`Qtd. coletas por dia semana - Ano ${year}`}</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dayTotalAVG}
                layout="horizontal"
                margin={{ top: 5, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="2 2" />
                <XAxis
                  type="category"
                  dataKey="dia_semana"
                  tick={{
                    fill: "black",
                    fontSize: 13,
                    textAnchor: "middle",
                    angle: "0",
                  }}
                />
                <YAxis
                  type="number"
                  tick={{
                    fill: "black",
                    fontSize: 13,
                    textAlign: "center",
                    textWeight: 700,
                    textAnchor: "end",
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="soma_coletas" fill="#2f143e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsBI;
