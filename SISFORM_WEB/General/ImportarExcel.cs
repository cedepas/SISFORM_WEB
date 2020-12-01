using Dominio;
using System;
using System.Data;
using System.IO;
using System.Web;
using ClosedXML.Excel;
using System.Collections.Generic;
using GeneralTrabajos;

namespace SISFORM_WEB.General
{
    public static class ImportarExcel
    {
        public static List<CargaMasiva> ExcelToList(HttpPostedFileBase file, string destino, string campo = "")
        {
            try
            {
                DataTable dt = new DataTable();
                if (file != null && file.ContentLength > 0 && Path.GetExtension(file.FileName).ToLower() == ".xlsx")
                {
                    string filePath = Path.Combine(HttpContext.Current.Server.MapPath("~/General"), Path.GetFileName(file.FileName));
                    file.SaveAs(filePath);
                    try
                    {
                        using (var workBook = new XLWorkbook(filePath))
                        {
                            IXLWorksheet workSheet = workBook.Worksheet("DATA");
                            IXLTable workTable = workSheet.Table("DATA");
                            bool firstRow = true;

                            foreach (IXLRangeRow row in workTable.Rows())
                            {
                                row.SetDataValidation().IgnoreBlanks = false;
                                if (firstRow)
                                {
                                    foreach (IXLCell cell in row.Cells())
                                    {
                                        dt.Columns.Add(cell.Value.ToString());
                                    }
                                    firstRow = false;
                                }
                                else
                                {
                                    dt.Rows.Add();
                                    int i = 0;
                                    foreach (IXLCell cell in row.Cells())
                                    {
                                        string pruba = "";
                                        pruba = cell.GetFormattedString();
                                        if (cell.CachedValue.ToString() == "")
                                        {
                                            dt.Rows[dt.Rows.Count - 1][i] = "";
                                        }
                                        else
                                        {
                                            dt.Rows[dt.Rows.Count - 1][i] = cell.CachedValue.ToString();
                                        }
                                        i++;
                                    }
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        ObjetoLog.Grabar(ex.Message, ex.StackTrace);
                        return null;
                    }
                }
                if (dt.Rows.Count > 0)
                {
                    List<CargaMasiva> lstCarga = new List<CargaMasiva>();
                    if (destino == "PruebaCOVID")
                    {
                        CargaMasiva carga;
                        foreach (DataRow item in dt.Rows)
                        {
                            if (item.ItemArray[13].ToString().Trim() != "")
                            {
                                carga = new CargaMasiva();
                                carga.nu_prueba = item.ItemArray[2].ToString().Replace("PRUEBA ", "");
                                carga.no_trab = item.ItemArray[3].ToString();
                                carga.ap_pate = item.ItemArray[4].ToString();
                                carga.ap_mate = item.ItemArray[5].ToString();
                                carga.nu_dni = item.ItemArray[7].ToString();
                                carga.fe_naci = string.Format("{0:yyyy/MM/dd}", Convert.ToDateTime(item.ItemArray[8].ToString()));
                                carga.tf_trab = item.ItemArray[9].ToString();
                                carga.direccion = item.ItemArray[11].ToString().Replace("|", "°");
                                carga.cargo = item.ItemArray[12].ToString();
                                carga.no_empr = item.ItemArray[14].ToString();
                                carga.resultado = item.ItemArray[16].ToString();
                                carga.tf_cont = item.ItemArray[17].ToString();
                                carga.no_cont = item.ItemArray[18].ToString();
                                carga.fe_prue = string.Format("{0:yyyy/MM/dd}", Convert.ToDateTime(item.ItemArray[19].ToString()));

                                lstCarga.Add(carga);
                            }
                        }
                    }

                    if (destino == "Trabajador")
                    {
                        CargaMasiva carga;
                        foreach (DataRow item in dt.Rows)
                        {
                            carga = new CargaMasiva();
                            carga.no_trab = item.ItemArray[7].ToString().ToUpper();
                            carga.ap_pate = item.ItemArray[6].ToString().ToUpper();
                            carga.ap_mate = item.ItemArray[5].ToString().ToUpper();
                            carga.nu_dni = item.ItemArray[4].ToString();
                            carga.fe_naci = string.Format("{0:yyyy/MM/dd}", Convert.ToDateTime(item.ItemArray[10].ToString()));
                            carga.tf_trab = item.ItemArray[12].ToString();
                            carga.direccion = item.ItemArray[16].ToString().ToUpper();
                            carga.cargo = (item.ItemArray[8].ToString().ToUpper().Trim() == "" ? "SIN CARGO" : item.ItemArray[8].ToString().ToUpper().Trim());
                            carga.no_empr = item.ItemArray[1].ToString().ToUpper().Trim();
                            carga.fe_prue = string.Format("{0:yyyy/MM/dd}", Convert.ToDateTime(campo));

                            lstCarga.Add(carga);
                        }
                    }
                    return lstCarga;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                ObjetoLog.Grabar(ex.Message, ex.StackTrace);
                return null;
            }
        }
    }
}