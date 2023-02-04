import { Link, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import XLSX from "xlsx";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export const ExportExcel = (props) => {
  const itens = [];
  const [data, setData] = useState(props.value);

  useEffect(() => {
    setData(props.value);
    data?.map((row) => {
      itens.push({
        "ID Do produto": row.id,
        Nome: row.product,
        "Quantos foram vendidos": row.quantity,
        Total: row.total,
        "Data da venda": row.data,
      });
    });
  }, [props.value]);

  const downloadExcel = () => {
    const newData = itens?.map((row) => {
      delete row.tableData;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "vendas realizadas");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "depositosrecentes.xlsx");
  };
  return (
    <div>
      <Link color="primary" href="#" onClick={downloadExcel}>
        Baixar tabela Excel
      </Link>
    </div>
  );
};

export default ExportExcel;
