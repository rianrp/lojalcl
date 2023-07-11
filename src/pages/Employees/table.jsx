import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Typography } from '@material-ui/core';
import addfotouser from "../../images/adicionar-usuario.png"

const columns = [
  { field: 'id', headerName: 'ID', width: 12 },
  {
    field: 'image',
    headerName: " ",
    width: 20,
    renderCell: (params) => <Avatar alt={addfotouser} src={params.value} />,
  },
  {
    field: 'name',
    headerName: 'Nome',
    width: 150,
    editable: true,
  },
];

export default function EnhancedTable(props) {
  return (
    <div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={props.employeesFiltrados ? props.employeesFiltrados : []}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
