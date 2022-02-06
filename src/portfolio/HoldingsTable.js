import { v4 as uuid } from "uuid";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const orders = [
  {
    id: uuid(),
    ref: "bitcoin",
    amount: 35000,
    customer: {
      name: "Bitcoin",
    },
  },
  {
    id: uuid(),
    ref: "ethereum",
    amount: 2500,
    customer: {
      name: "Ethereum",
    },
  },
];

export const HoldingsTable = (props) => (
  <Card {...props}>
    <CardHeader title="Holdings" />
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Coin</TableCell>
            <TableCell sortDirection="desc">
              <Tooltip enterDelay={300} title="Sort">
                <TableSortLabel active direction="desc">
                  Amount
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow hover key={order.id}>
              <TableCell>{order.ref}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>{order.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        p: 2,
      }}
    ></Box>
  </Card>
);
