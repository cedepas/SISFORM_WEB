using SISFORM_WEB.ServicioWcf;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SISFORM_WEB.Controllers
{
    public class SeguimientoNegociosController : Controller
    {
        // GET: SeguimientoNegocios
        public ActionResult Inspecciones()
        {
            ViewBag.Title = "Inspecciones";
            return View();
        }
        public async Task<string> ListarInspecciones(string idUsuario)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarInspeccionesCsvAsync(idUsuario);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
