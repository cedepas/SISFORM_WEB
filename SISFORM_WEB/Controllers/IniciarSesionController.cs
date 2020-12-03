using Dominio;
using System;
using System.Threading.Tasks;
using System.Text.Json;
using System.Web.Mvc;
using SISFORM_WEB.ServicioWcf;//ServicioWcfClient

namespace SISFORM_WEB.Controllers
{
    public class IniciarSesionController : Controller
    {
        // GET: IniciarSesion
        VistaUsuario oVistaUsuario;
        public ActionResult Inicio()
        {
            ViewBag.Title = "Iniciar sesion";
            return View();
        }

        public ActionResult CerrarSesion()
        {
            Session["userAuthorize"] = null;
            return RedirectToAction("Inicio", "IniciarSesion");
        }

        public async Task<string> AutenticarUsuario(string usuario, string clave)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                VistaUsuario data = await servicio.AutenticarUsuarioAsync(usuario, clave);
                if (data!=null)
                {
                    string permisos = await servicio.AutorizacionUsuarioCsvAsync(data.ID_Usuario.ToString());

                    Session["userAuthorize"] = data;
                    Session["userPermision"] = permisos;

                    rpta = JsonSerializer.Serialize<VistaUsuario>(data);
                }
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
            
        }
    }
}