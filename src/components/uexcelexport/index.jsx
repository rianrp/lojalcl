import { Link, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import XLSX from "xlsx";
import { Enums } from "../enums";

function category(category) {
  switch (category) {
    case Enums.paymentMethod.pix:
      category = "Pix";
      break;
    case Enums.paymentMethod.dinheiro:
      category = "Dinheiro";
      break;
    case Enums.paymentMethod.cheque:
      category = "Cheque";
      break;
    case Enums.paymentMethod.cartaodedebito:
      category = "Cartão de débito";
      break;
    case Enums.paymentMethod.cartaodecredito:
      category = "Cartão de crédito";
      break;
    case Enums.paymentMethod.boletobancario:
      category = "Boleto";
      break;

    default:
      break;
  }

  return category;
}

export const ExportExcel = (props) => {
  const itens = [];
  const [data, setData] = useState(props.value);

  const returnDate = (dataString) => {
    let date = new Date(dataString);
    return String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear()
  }

  useEffect(() => {
    setData(props.value);
    data?.map((row) => {
      itens.push({
        Produtos: row.itens,
        Descrição: row.description,
        Total: row.total,
        Desconto: row.discount,
        Pagamento: category(row.payment),
        "Data": returnDate(row.data),
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
