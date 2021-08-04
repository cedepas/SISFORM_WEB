using SISFORM_WEB.Filters;
using SISFORM_WEB.ServicioWcf;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SISFORM_WEB.Controllers
{
    [AutorizacionModulos("6")]
    public class AdministracionController : Controller
    {
        // GET: Administracion
        public ActionResult Permisos()
        {
            ViewBag.Title = "Permisos";
            return View();
        }
        //public async Task<string> ListarCtrlModulosCbo()
        //{
        //    try
        //    {
        //        string rpta = "";
        //        ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
        //        //rpta = await servicio.ListarCtrlModulosCboCsvAsync();
        //        return rpta;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }
        //}
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
        public async Task<string> AutorizacionUsuario(string idUsuario)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                //rpta = await servicio.AutorizacionUsuarioCsvAsync(idUsuario);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        //public async Task<string> Grabar(CtrlAccion oCtrlAccion)
        //{
        //    int rpta = 0;

        //    ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
        //    rpta = await servicio.CtrlAccionOperacionAsync(oCtrlAccion);
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