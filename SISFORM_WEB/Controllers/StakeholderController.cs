using Dominio;
using SISFORM_WEB.Filters;
using SISFORM_WEB.ServicioWcf;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SISFORM_WEB.Controllers
{
    [AutorizacionModulos("2")]
    public class StakeholderController : Controller
    {
        #region Stakeholders

        // GET: Stakeholders
        public ActionResult Stakeholders()
        {
            ViewBag.Title = "Stakeholders";
            return View();
        }

        public async Task<string> ListarPoderConvocatoriaCbo()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarPoderConvocatoriaCboCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<string> ListarTipoPosicionamientoCbo()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTipoPosicionamientoCboCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<string> ListarEmpresaRazonSocialPorTipoCboCsv(string idTipoEmpresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEmpresaRazonSocialPorTipoCboCsvAsync(idTipoEmpresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<string> GrabarStakeholder(Stakeholder oStakeholder)
        {
            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            var rpta = await servicio.StakeholderOperacionAsync(oStakeholder, oStakeholder.ID_Stakeholder == 0 ? "I" : "U");
            return rpta == 0 ? "" : rpta.ToString();
        }

        #endregion
    }
}