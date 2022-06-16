import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { buffer } from "rxjs-compat/operator/buffer";
import * as XLSX from "xlsx";
import * as FileSaver from 'file-saver';
const Excel_Type ="application/vnd.opnxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
const EXCEL_EXT='.xlsx';

@Injectable({
    providedIn: 'root'
})
export class ExportService{

constructor(){}

exportToExcel(json: any[], excelFileName: string):void {
    const worksheet: XLSX.WorkSheet =XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook={
        Sheets: {'data': worksheet},
        SheetNames: ['data']
    };
    const excelBuffer: any =XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
    this.saveAsExcel(excelBuffer, excelFileName);
 
    
}

saveAsExcel(buffer: any, fileName: string): void{
    const data: Blob = new Blob([buffer], {type: Excel_Type});
    FileSaver.saveAS(data, fileName+'_export_'+ new Date().getTime() + EXCEL_EXT);
}
}