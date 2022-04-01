import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PropTypes from 'prop-types'

const data = [
  { name: "January", tigo: 1200, voda: 500, halo: 900, airtel: 500 },
  { name: "February", tigo: 2100, voda: 1200, halo: 600, airtel: 400 },
  { name: "March", tigo: 800, voda: 1000, halo: 1500, airtel: 600 },
  { name: "April", tigo: 1600, voda: 1100, halo: 900, airtel: 500 },
  { name: "May", tigo: 900, voda: 1200, halo: 500, airtel: 400 },
  { name: "June", tigo: 1700, voda: 800, halo: 1200, airtel: 900 },
];

const Chart = ({ aspect, title, chart }) => {

  let newArray = chart.map(obj => Object.assign({}, obj, {tigo: parseInt(obj.tigo), voda: parseInt(obj.voda), halo: parseInt(obj.halo), airtel: parseInt(obj.airtel)}))
  
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={newArray}
          // data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="tigo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="voda" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff7f7f" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff7f7f" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="halo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffd580" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffd580" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="airtel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="tigo"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#tigo)"
          />
          <Area
            type="monotone"
            dataKey="voda"
            stroke="#ff7f7f"
            fillOpacity={1}
            fill="url(#voda)"
          />
          <Area
            type="monotone"
            dataKey="halo"
            stroke="#ffd580"
            fillOpacity={1}
            fill="url(#halo)"
          />
          <Area
            type="monotone"
            dataKey="airtel"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#airtel)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};


Chart.propTypes = {
  chart : PropTypes.array
}


export default Chart;
