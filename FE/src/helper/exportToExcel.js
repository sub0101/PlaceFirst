import * as XLSX from 'xlsx';

export const exportToExcel = (jsonData, fileName) => {
  // Create a worksheet from JSON data
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  
  // Create a workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Generate a file and trigger download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
