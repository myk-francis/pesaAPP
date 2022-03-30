import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'



const Featured = ({targets}) => {

  if (targets === null) {
    return <h4>Loading...</h4>
  }

  const amountMadeToday = targets[0].comps_today === null ? 0 : parseFloat(targets[0].comps_today)
  const targetAvgAmount = targets[0].comps_target === null ? 0 : parseFloat(targets[0].comps_target)
  const avgAmountLastWeek = targets[0].comps_avg_week === null ? 0 : parseFloat(targets[0].comps_avg_week)
  const avgAmountLastMonth = targets[0].comps_avg_month === null ? 0 : parseFloat(targets[0].comps_avg_month)

  let user_percentage = 100
  if (targets[0].comp_percentage !== null) {
    if (targets[0].comp_percentage > 100) {
      user_percentage = 100
    }
  }


  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue as of today</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={parseFloat(user_percentage)} text={`${user_percentage}%`} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">{`${amountMadeToday.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} tzs`}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className={`itemResult ${amountMadeToday <= targetAvgAmount ? 'negative' : 'positive'}`}>
              {amountMadeToday <= targetAvgAmount ? <KeyboardArrowDownIcon fontSize="small"/> : <KeyboardArrowUpOutlinedIcon fontSize="small"/>}
              <div className="resultAmount">{`${targetAvgAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} tzs`}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className={`itemResult ${amountMadeToday <= avgAmountLastWeek ? 'negative' : 'positive'}`}>
              {amountMadeToday <= avgAmountLastWeek ? <KeyboardArrowDownIcon fontSize="small"/> : <KeyboardArrowUpOutlinedIcon fontSize="small"/>}
              <div className="resultAmount">{`${avgAmountLastWeek.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} tzs`}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className={`itemResult ${amountMadeToday <= avgAmountLastMonth ? 'negative' : 'positive'}`}>
              {amountMadeToday <= avgAmountLastMonth ? <KeyboardArrowDownIcon fontSize="small"/> : <KeyboardArrowUpOutlinedIcon fontSize="small"/>}
              <div className="resultAmount">{`${avgAmountLastMonth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} tzs`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


Featured.propTypes = {
  targets : PropTypes.array
}

const mapStateToProps = state => ({
  targets : state.transactions.targets
})

export default connect(mapStateToProps, { })(Featured)