using Dominio;
using SISFORM_WEB.ServicioWcf;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web.Mvc;
using SISFORM_WEB.Filters;

namespace SISFORM_WEB.Controllers
{
    //[AutorizacionModulos("1")]
    public class TrabajadorController : Controller
    {
        // GET: Trabajador 59
        public ActionResult Operacion()
        {
            ViewBag.Title = "Trabajador";
            return View();
        }

        //public ActionResult PruebaCovid()
        //{
        //    ViewBag.Title = "Prueba Covid";
        //    return View();
        //}
        //public ActionResult ProgramacionPruebaCovid()
        //{
        //    ViewBag.Title = "Programación Prueba Covid";
        //    return View();
        //}
        public async Task<string> ListarTipoDocumentoCbo()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTipoDocumentoCboCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> listarUbigeoCbo()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarUbigeoCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarTrabajador()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTrabajadorCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarTrabajadorJson()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                IEnumerable<Trabajador> data = await servicio.ListarTrabajadorAsync();
                if (data != null)
                {
                    rpta = JsonSerializer.Serialize<IEnumerable<Trabajador>>(data);
                }
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarPuestoTrabajoCbo(string idEmpresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarPuestoTrabajoCboCsvAsync(idEmpresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarEmpresaCbo()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEmpresaCboCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> Grabar(Trabajador oTrabajador)
        {
            int rpta = 0;
            string op = "";
            if (oTrabajador.ID_Trabajador==0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.TrabajadorOperacionAsync(oTrabajador, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }

        public async Task<string> GrabarPuesto(TrabajadorPuesto oTrabajadorPuesto)
        {
            int rpta = 0;
            string op = "";
            if (oTrabajadorPuesto.ID_TrabajadorPuesto == 0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.TrabajadorPuestoOperacionAsync(oTrabajadorPuesto, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }
        public async Task<string> ObtenerTrabajadorPorId(string idTrabajador)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObtenerTrabajadorPorIdCsvAsync(idTrabajador);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
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
        public async Task<string> ObtenerIdTrabajadorPorIdUsuarioCsv(string idUsuario)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObtenerIdTrabajadorPorIdUsuarioCsvAsync(idUsuario);
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarPruebasCovid()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarPruebasCovidCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarResultadoPruebaCbo()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarResultadoPruebaCboCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> GrabarPrueba(PruebasCovid oPruebasCovid)
        {
            int rpta = 0;
            string op = "";
            if (oPruebasCovid.ID_PruebasCovid == 0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.PruebasCovidOperacionAsync(oPruebasCovid, op);
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