using SISFORM_WEB.Filters;
using SISFORM_WEB.ServicioWcf;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SISFORM_WEB.Controllers
{
    [AutorizacionModulos("2")]
    public class HabitacionController : Controller
    {
        public ActionResult Operacion()
        {
            return View();
        }
        public async Task<string> ListarEmpresasHospedajesCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEmpresasHospedajesCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<string> ListarTipoHabitacionCboCsv()
        {
            try
            {
                string rpta = string.Empty;
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTipoHabitacionCboCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<string> ListarEstadoHabitacionCboCsv()
        {
            try
            {
                string rpta = string.Empty;
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEstadoHabitacionCboCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<string> GrabarHabitacion(Habitacion oHabitacion)
        {
            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            var rpta = await servicio.HabitacionOperacionAsync(oHabitacion, oHabitacion.ID_Habitacion == 0 ? "I" : "U");
            return rpta == 0 ? "" : rpta.ToString();
        }

        public async Task<string> ListarHabitacionPorIdEmpresaCsv(string idEmpresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarHabitacionPorIdEmpresaCsvAsync(idEmpresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<string> ObtenerHabitacionPorIdCsv(string idHabitacion)
        {
            try
            {
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                var rpta = await servicio.ObtenerHabitacionPorIdCsvAsync(idHabitacion);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<string> ObtenerTotalHabitacionPorIdEmpresaCsv(string idEmpresa)
        {
            try
            {
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                var rpta = await servicio.ObtenerTotalHabitacionPorIdEmpresaCsvAsync(idEmpresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}