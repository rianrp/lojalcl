import React from 'react';
import ExcelJS from 'exceljs';
import { Button } from '@material-ui/core';

export const ExportExcel = (props) => {
  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    // Adicione os cabeçalhos das colunas
    props.columns.forEach((column, index) => {
      worksheet.getCell(getCellRef(1, index + 1)).value = column;
    });

    // Adicione os dados
    props.data.forEach((rowData, rowIndex) => {
      rowData.forEach((cellData, columnIndex) => {
        worksheet.getCell(getCellRef(rowIndex + 2, columnIndex + 1)).value = cellData;
      });
    });

    // Crie um buffer para o arquivo Excel
    return workbook.xlsx.writeBuffer();
  };

  const getCellRef = (row, col) => {
    const columnLetter = String.fromCharCode(65 + (col - 1));
    return `${columnLetter}${row}`;
  };

  const handleExportClick = () => {
    exportToExcel().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${props.filename}.xlsx`);
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  return <Button onClick={handleExportClick}>{props.element}</Button>;
};

export default ExportExcel;
