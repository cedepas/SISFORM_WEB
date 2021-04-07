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
        public ActionResult CheckList()
        {
            ViewBag.Title = "CheckList";
            return View();
        }
        public ActionResult Capacitacion()
        {
            ViewBag.Title = "Capacitacion";
            return View();
        }

        public async Task<string> ListarCapacitacionesCsv(int idUsuario)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarCapacitacionesCsvAsync(idUsuario);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarCheckListCsv(int idUsuario)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarCheckListCsvAsync(idUsuario);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
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
        public async Task<string> ListarEstadoInspeccionCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEstadoInspeccionCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> GrabarInspeccion(Inspeccion oInspeccion,string op)
        {
            int rpta = 0;
            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.InspeccionOperacionAsync(oInspeccion, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }
        public async Task<string> ListarTipoOperacionEmpresaCsv(int tipoEmpresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                //rpta = await servicio.ListarEstadoInspeccionCsvAsync();
                rpta = await servicio.ListarTipoOperacionEmpresaCsvAsync(tipoEmpresa);

                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarCantidadPreguntasChecklistCsv(int FK_ID_Empresa, int tipoServicio)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                //rpta = await servicio.ListarEstadoInspeccionCsvAsync();
                rpta = await servicio.ListarCantidadPreguntasChecklistCsvAsync(FK_ID_Empresa, tipoServicio);

                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> CheckListOperacion(CheckList oCheckList, string op)
        {
            int rpta = 0;
            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.CheckListOperacionAsync(oCheckList, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }
        public async Task<string> CapacitacionOperacion(Capacitacion oCapacitacion, string op)
        {
            int rpta = 0;
            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.CapacitacionOperacionAsync(oCapacitacion, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }

        public async Task<string> ListarEstadoCapacitacionCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEstadoCapacitacionCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarTemaCapacitacionCsv(int tipoEmpresa, int tipoServicio, int FK_ID_UnidadGestion)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTemaCapacitacionCsvAsync(tipoEmpresa, tipoServicio, FK_ID_UnidadGestion);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ActualizarPuestoTrabajadorPorEmpresaCsv(int FK_ID_Empresa, string listadoTrabajadores, int FK_ID_Usuario)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ActualizarPuestoTrabajadorPorEmpresaCsvAsync(FK_ID_Empresa, listadoTrabajadores, FK_ID_Usuario);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
