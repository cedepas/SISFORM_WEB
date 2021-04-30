using Dominio;
using GeneralTrabajos;
using SISFORM_WEB.Filters;
using SISFORM_WEB.General;
using SISFORM_WEB.ServicioWcf;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;


namespace SISFORM_WEB.Controllers
{
    [AutorizacionModulos("3")]
    public class PruebaCovidController : Controller
    {
        public ActionResult PruebaCovid()
        {
            ViewBag.Title = "Prueba Covid";
            return View();
        }
        public ActionResult ProgramacionPruebaCovid()
        {
            ViewBag.Title = "Programación Prueba Covid";
            return View();
        }
        public ActionResult ProgramacionMasivaPruebaCovid()
        {
            ViewBag.Title = "Programación Masiva Prueba Covid";
            return View();
        }
        public async Task<string> ObtenerTrabajadorPorId(string idTrabajador)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObtenerTrabajadorPorIdCsvAsync(idTrabajador);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ObtenerProgramacionPruebaCovidPorIdCsv(string idPruebaCovid)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObtenerPruebaCovidPorIdCsvAsync(idPruebaCovid);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ObtenerporDni(string dni)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObtenerporDniCsvAsync(dni);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarPruebasCovid()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarPruebasCovidCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarPruebas()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarPruebasCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarResultadoPruebaCbo()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarResultadoPruebaCboCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarResultadosCovidPorFechaCsv(string fechaPrueba)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarResultadosCovidPorFechaCsvAsync(fechaPrueba);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<string> GrabarPrueba(PruebasCovid oPruebasCovid)
        {
            int rpta = 0;
            string op = "";
            if (oPruebasCovid.ID_PruebasCovid == 0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.PruebasCovidOperacionAsync(oPruebasCovid, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }
        public async Task<string> GrabarPruebasCovidMasivo(string data, string idUsuario)
        {
            int rpta = 0;

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.PruebasCovidMasivoAsync(data, idUsuario);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }
        public async Task<string> CargarExcel(HttpPostedFileBase file, string idUsuario)
        {
            try
            {
                int rpta = 0;
                List<CargaMasiva> lstCarga = ImportarExcel.ExcelToList(file, "PruebaCOVID");

                if (lstCarga.Count > 0)
                {
                    ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                    rpta = await servicio.PruebasCovidCargaAsync(lstCarga.ToArray(), idUsuario);
                }

                if (rpta == 0)
                {
                    return "";
                }
                else
                {
                    return rpta.ToString();
                }
            }
            catch (Exception ex)
            {
                ObjetoLog.Grabar(ex.Message, ex.StackTrace);
                return "";
            }
        }
        //public string ExpoExcel(string data, string idUsuario)
        //{
        //    int rpta = 0;
        //    dat
        //    //ExportarExcel exportarExcel = new ExportarExcel();
        //    string exportarExcel = ExportarExcel.Exportar("nombre","10",);
        //    if (rpta == 0)
        //    {
        //        return "";
        //    }
        //    else
        //    {
        //        return rpta.ToString();
        //    }
        //}

    }
}