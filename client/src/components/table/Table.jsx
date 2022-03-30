import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const List = ({table}) => {
  let amount = 100000
  let strAmount = '' + amount
  const rows = [
    {
      id: 1,
      company: "Tigo",
      customer: "0710-503399",
      date: "1 March",
      amount: strAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      method: "Deposit",
      status: "Approved",
    },
    {
      id: 2,
      company: "Tigo",
      customer: "0710-503399",
      date: "1 March",
      amount: strAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      method: "Deposit",
      status: "Pending",
    },
    {
      id: 3,
      company: "Tigo",
      customer: "0710-503399",
      date: "1 March",
      amount: strAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      method: "Deposit",
      status: "Pending",
    },
    {
      id: 4,
      company: "Tigo",
      customer: "0710-503399",
      date: "1 March",
      amount: strAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      method: "Deposit",
      status: "Pending",
    },
    {
      id: 5,
      company: "Tigo",
      customer: "0710-503399",
      date: "1 March",
      amount: strAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      method: "Deposit",
      status: "Deleted",
    },
  ];

  if (table === null) {
    return  <h4>No data...</h4>
  }


  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Company</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Time</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table.map((table) => (
            <TableRow key={table.id}>
              <TableCell className="tableCell">{table.companytype}</TableCell>
              <TableCell className="tableCell">{table.phonenumber}</TableCell>
              <TableCell className="tableCell">{table.rectime}</TableCell>
              <TableCell className="tableCell">{table.amount}</TableCell>
              <TableCell className="tableCell">{table.transactiontype}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${table.status}`}>{table.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


List.propTypes = {
  table : PropTypes.array
}

const mapStateToProps = state => ({
  table : state.transactions.table
})

export default connect(mapStateToProps, { })(List)
