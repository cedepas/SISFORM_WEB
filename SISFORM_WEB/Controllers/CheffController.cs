
using SISFORM_WEB.ServicioWcf;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SISFORM_WEB.Controllers
{
    public class CheffController : Controller
    {
        // GET: Cheff
        public ActionResult Seguimiento()
        {
            return View();
        }
        public ActionResult Implementacion()
        {
            return View();
        }
        public ActionResult CumplimientoMenu()
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
        public async Task<string> ImplementacionCheff(ImplementacionCheff oImplementacionCheff, string op)
        {
            int rpta = 0;
            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.ImplementacionCheffAsync(oImplementacionCheff, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }

        public async Task<string> ListarEstadoImplementacionCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEstadoImplementacionCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarTemaImplementacionCsv(int tipoServicio, int FK_ID_UnidadGestion)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTemaImplementacionCsvAsync(tipoServicio, FK_ID_UnidadGestion);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarImplementacionesCsv(int idUsuario)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarImplementacionesCsvAsync(idUsuario);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<string> ListarSeguimientosChefCsv(int FK_ID_Usuario)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarSeguimientosChefCsvAsync(FK_ID_Usuario);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarCumplimientoMenuCsv(int FK_ID_Usuario)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarCumplimientoMenuCsvAsync(FK_ID_Usuario);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        
        public async Task<string> GuardarSeguimiento(int FK_ID_Usuario,string lstSeguimientos)
        {
            try
            {
                lstSeguimientos = lstSeguimientos.Substring(1, lstSeguimientos.Length - 1);
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.SeguimientoChefOperacionAsync(FK_ID_Usuario, lstSeguimientos);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> GuardarCumplimientoMenu(int FK_ID_Usuario, string lstCumplimientos)
        {
            try
            {
                lstCumplimientos = lstCumplimientos.Substring(1, lstCumplimientos.Length - 2);
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.CumplimientoMenuOperacionAsync(FK_ID_Usuario, lstCumplimientos);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        
    }

}

