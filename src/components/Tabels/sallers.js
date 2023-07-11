import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import { Enums } from "../../enums";

function category(category) {
  switch (category) {
    case Enums.category.pelicula:
      category = "Película";
      break;
    case Enums.category.capinha:
      category = "Capinha";
      break;
    case Enums.category.carregador:
      category = "Carregador";
      break;
    case Enums.category.cabo:
      category = "Cabo";
      break;
    case Enums.category.fonte:
      category = "Fonte";
      break;
    case Enums.category.caixadesom:
      category = "Caixa de som";
      break;
    case Enums.category.fonedeouvido:
      category = "Fone de ouvido";
      break;
    case Enums.category.suporteparacelular:
      category = "Suporte para celular";
      break;
    case Enums.category.mouse:
      category = "Mouse";
      break;
    case Enums.category.teclado:
      category = "Teclado";
      break;
    case Enums.category.relogio:
      category = "Relógio";
      break;
    case Enums.category.adaptador:
      category = "Adaptador";
      break;
    case Enums.category.outros:
      category = "Outros";
      break;

    default:
      break;
  }
  return category;
}

function payment(category) {
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

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "itens",
    headerName: "Nome do produto",
    width: 220,
    editable: true,
  },
  {
    field: "payment",
    headerName: "Metôdo de pagamento",
    width: 220,
    editable: true,
    valueGetter: (params) => payment(params.value),
  },
  {
    field: "total",
    headerName: "Total",
    type: "number",
    width: 110,
    editable: true,
    valueGetter: (params) => "R$ " + parseFloat(params.value).toFixed(2),
  },
  {
    field: "quantityItem",
    headerName: "Quantidade",
    type: "number",
    width: 170,
    editable: true,
  },
  {
    field: "data",
    headerName: "Data de venda",
    type: "number",
    width: 170,
    editable: true,
    valueGetter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString("pt-BR");
      },
  },
];

export default function DataTableSallers(props) {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    if (props.data != null) {
      setData(props.data.data);
    }
  }, [props.data]);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
