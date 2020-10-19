using Dominio;
using SISFORM_WEB.ServicioWcf;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using SISFORM_WEB.Filters;
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
    }
}