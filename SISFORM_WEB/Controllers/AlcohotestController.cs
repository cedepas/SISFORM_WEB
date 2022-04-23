using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using SISFORM_WEB.Filters;
using SISFORM_WEB.ServicioWcf;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SISFORM_WEB.Controllers
{
    [AutorizacionModulos("2")]
    public class AlcohotestController : Controller
    {
        public ActionResult Operacion()
        {
            ViewBag.Title = "Alcohotest";
            return View();
        }

        //21 04 2022 - CONTINUAR CON LA PROGRAMACION
        public async Task<string> Grabar(RegistroAlcohotest oRegistroAlcohotest)
        {
            int rpta = 0;
            string op = "";
            if (oRegistroAlcohotest.ID_RegistroAlcohotest == 0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            //
            rpta = await servicio.RegistroAlcohotestOperacionAsync(oRegistroAlcohotest, op);
            //
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }


        public async Task<string> ListarRegistroAlcohotest(RegistroAlcohotest oRegistroAlcohotest)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarRegistroAlcohotestCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public async Task<string> ObtenerRegistroAlcohotestPorIdCsv(int IDRegistroAlcohotest)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObtenerRegistroAlcohotestPorIdCsvAsync(IDRegistroAlcohotest);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }



    }
    


}