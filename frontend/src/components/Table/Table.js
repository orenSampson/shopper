import { useEffect, useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { getData } from "../../api/shopperAPI";

const DATA_TYPE = "table";

function createData(
  categoryName,
  productViews,
  productViewsChange,
  revenue,
  revenueChange,
  unitsSold,
  unitsSoldChange,
  cvr
) {
  return {
    categoryName,
    productViews,
    productViewsChange,
    revenue,
    revenueChange,
    unitsSold,
    unitsSoldChange,
    cvr,
  };
}

export default function BasicTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getData(DATA_TYPE);

      const mappedRows = data.map((row) =>
        createData(
          row.category_name,
          row.product_views,
          row.product_views_change,
          row.revenue,
          row.revenue_change,
          row.units_sold,
          row.units_sold_change,
          row.cvr
        )
      );

      setRows(mappedRows);
    }

    fetchData();
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category Name</TableCell>
            <TableCell align="right">Product Views</TableCell>
            <TableCell align="right">Product Views change</TableCell>
            <TableCell align="right">Revenue</TableCell>
            <TableCell align="right">Revenue change</TableCell>
            <TableCell align="right">Units Sold</TableCell>
            <TableCell align="right">Units Sold change</TableCell>
            <TableCell align="right">CVR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.categoryName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.categoryName}
              </TableCell>
              <TableCell align="right">{row.productViews}</TableCell>
              <TableCell align="right">{row.productViewsChange}</TableCell>
              <TableCell align="right">{row.revenue}</TableCell>
              <TableCell align="right">{row.revenueChange}</TableCell>
              <TableCell align="right">{row.unitsSold}</TableCell>
              <TableCell align="right">{row.unitsSoldChange}</TableCell>
              <TableCell align="right">{row.cvr}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
