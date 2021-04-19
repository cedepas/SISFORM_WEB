using SISFORM_WEB.ServicioWcf;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SISFORM_WEB.Controllers
{
    public class CheffController : Controller
    {
        // GET: Cheff
        public ActionResult Evaluacion()
        {
            return View();
        }
        public async Task<string> ListarTiemposComidaCboCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTiemposComidaCboCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }

}

