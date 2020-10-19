using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using SISFORM_WEB.ServicioWcf;
using SISFORM_WEB.Filters;

namespace SISFORM_WEB.Controllers
{
    [AutorizacionModulos("4")]
    public class ReporteController : Controller
    {
        // GET: Reporte
        public ActionResult Consulta()
        {
            ViewBag.Title = "Reporte";
            return View();
        }
        public async Task<string> ListarReporteCovid(string fechaInicio, string fechaFin)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarReporteCovidCsvAsync(fechaInicio, fechaFin);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}