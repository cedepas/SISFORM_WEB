using Dominio;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using SISFORM_WEB.ServicioWcf;
using SISFORM_WEB.Filters;

namespace SISFORM_WEB.Controllers
{
    //[AutorizacionModulos("5")]
    public class IncidenciaController : Controller
    {
        public ActionResult Incidencia()
        {
            ViewBag.Title = "Incidencias";
            return View();
        }        
        public ActionResult SolucionIncidencia()
        {
            ViewBag.Title = "SolucionIncidencia";
            return View();
        }
        public ActionResult BusquedaIncidencia()
        {
            ViewBag.Title = "BusquedaIncidencia";
            return View();
        }
        public async Task<string> ListarTipoEventoCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTipoEventoCsvAsync();
                return rpta;
            }
            catch(Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarCategoriaCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarCategoriaCsvAsync();
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarBloqueCsv(string idCategoria)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarBloqueCsvAsync(idCategoria);
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarEspecificacionCsv(string idCategoria, string idBloque)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEspecificacionCsvAsync(idCategoria,idBloque);
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarZonaCbo()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarZonaCsvAsync();
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarUbicacionCbo(string idZona)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarUbicacionCsvAsync(idZona);
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarBarreraCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarBarreraCsvAsync();
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarTipoBarreraCsv(string idBarrera)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTipoBarreraCsvAsync(idBarrera);
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarRangoCumplimientoCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarRangoCumplimientoCsvAsync();
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarTipoProgramacionIncidenciaCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTipoProgramacionIncidenciaCsvAsync();
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarEstadoIncidenciaCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEstadoIncidenciaCsvAsync();
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }        
        public async Task<string> ListarIncidenciasActCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarIncidenciasActCsvAsync();
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }         
        public async Task<string> ObtenerIncidenciaPorIdCsv(string idIncidencia)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObtenerIncidenciaPorIdCsvAsync(idIncidencia);
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }                
        public async Task<string> ObtenerIncidenciaPorIdParaSolucionCsv(string idIncidencia)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObtenerIncidenciaPorIdParaSolucionCsvAsync(idIncidencia);
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }   
        public async Task<string> ListarIncidenciaParaSolucionCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarIncidenciaParaSolucionCsvAsync();
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }           
        public async Task<string> ListarTipoSolucionIncidenciaCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTipoSolucionIncidenciaCsvAsync();
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarTipoFiltroIncidenciaCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTipoFiltroIncidenciaCsvAsync();
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ObtenerIncidenciaPorFiltroCsv(string ID_TipoFilto, string Filtro)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObtenerIncidenciaPorFiltroCsvAsync(ID_TipoFilto, Filtro);
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> EnviarCorreo(string idIncidencia)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ConstruirCorreoAsync(idIncidencia);
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }          
        public async Task<string> RegistrarSolucion(Solucion oSolucion)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.RegistrarSolucionAsync(oSolucion);
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> IncidenciaImagen(Imagen oImagen)
        {
            int rpta = 0;
            string op = "";
            if (oImagen.ID_ImagenIncidencia  == 0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.IncidenciaImagenAsync(oImagen, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }
        
        public async Task<string> GrabarIncidencia(Incidencia oIncidencia)
        {
            int rpta = 0;
            string op = "";
            if (oIncidencia.ID_Incidencia == 0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.IncidenciaOperacionAsync(oIncidencia, op);
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