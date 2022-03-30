import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect } from "react";
import { getChartData, getTargetsData, getWidgetsData, getDailyTransactionsData, getCompaniesTrasactions } from '../../actions/transactionActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Home = ({ chart, widgets, getChartData, getTargetsData, getWidgetsData, getDailyTransactionsData, getCompaniesTrasactions }) => {

  useEffect(() => {

    getCompaniesTrasactions()
    getDailyTransactionsData()
    getWidgetsData()
    getTargetsData()
    getChartData()

  }, [])

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          {widgets !== null && <Widget percent={widgets[0].tigo_percent} amount={widgets[0].tigo_today} type="tigo" />}
          {widgets !== null && <Widget percent={widgets[0].voda_percent} amount={widgets[0].voda_today} type="voda" />}
          {widgets !== null && <Widget percent={widgets[0].halo_percent} amount={widgets[0].halo_today} type="halo" />}
          {widgets !== null && <Widget percent={widgets[0].air_percent} amount={widgets[0].air_today} type="air" />}
        </div>
        <div className="charts">
          <Featured />
          {chart !== null && chart.length !== 0 && <Chart className="charts-dash" chart={chart} title="Last 6 Months (Revenue)" aspect={2 / 1} />}
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};


Home.propTypes = {
  getCompaniesTrasactions : PropTypes.func.isRequired,
  getDailyTransactionsData : PropTypes.func.isRequired,
  getTargetsData : PropTypes.func.isRequired,
  getWidgetsData : PropTypes.func.isRequired,
  getChartData : PropTypes.func.isRequired,
  widgets : PropTypes.array,
  chart : PropTypes.array
}

const mapStateToProps = state => ({
  widgets : state.transactions.widgets,
  chart : state.transactions.chart
})

export default connect(mapStateToProps, { getChartData, getTargetsData, getWidgetsData, getDailyTransactionsData, getCompaniesTrasactions })(Home)
