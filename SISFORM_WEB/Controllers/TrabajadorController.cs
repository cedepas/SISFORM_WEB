using GeneralTrabajos;
using SISFORM_WEB.Filters;
using SISFORM_WEB.General;
using SISFORM_WEB.ServicioWcf;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SISFORM_WEB.Controllers
{
    [AutorizacionModulos("1")]
    public class TrabajadorController : Controller
    {
        // GET: Trabajador 59
        public ActionResult Operacion()
        {
            ViewBag.Title = "Trabajador";
            return View();
        }
        public ActionResult Asignacion()
        {
            ViewBag.Title = "Asignacion de servicios";
            return View();
        }

        public ActionResult Masivo()
        {
            ViewBag.Title = "Carga masiva de trabajadores";
            return View();
        }

        public async Task<string> ValidarDniReniec(string DNI)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ValidarDniReniecAsync(DNI);
                if (rpta.Length > 3)
                {
                    rpta = rpta;
                }
                else
                {
                    rpta = "";
                }
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

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
        public async Task<string> ListarUnidadGestionCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarUnidadGestionCsvAsync();
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
        public async Task<string> ListarTrabajadorRepresentanteCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTrabajadorRepresentanteCsvAsync();
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
        public async Task<string> ListarPuestoTrabajoPorEmpresaCboCsv(string idEmpresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarPuestoTrabajoPorEmpresaCboCsvAsync(idEmpresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarTrabajadorPorEmpresaCsv(int idEmpresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTrabajadorPorEmpresaCsvAsync(idEmpresa);
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

        #region Mantenimiento
        public async Task<string> Grabar(Trabajador oTrabajador)
        {
            int rpta = 0;
            string op = "";
            if (oTrabajador.ID_Trabajador == 0)
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
        public async Task<string> AsignacionServiciosOperacion(AsignacionServicios oAsignacionServicios)
        {
            int rpta = 0;
            string op = "";
            if (oAsignacionServicios.ID_AsignacionServicios == 0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.AsignacionServiciosOperacionAsync(oAsignacionServicios, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }


        public async Task<string> ListarPuestoTrabajoporIdCsv(int idTrabajador)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarPuestoTrabajoporIdCsvAsync(idTrabajador);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarPuestoTrabajoporIdTrabajadorPuestoCsv(int idTrabajadorPuesto)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarPuestoTrabajoporIdTrabajadorPuestoCsvAsync(idTrabajadorPuesto);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public async Task<string> ObtenerAsignacionServicioPorId(int idAsignacionServicio)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObtenerAsignacionServicioPorIdAsync(idAsignacionServicio);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
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
        #endregion

        #region Asignacion y masivo
        public async Task<string> ListarTipoEmpresaCbo()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTipoEmpresaCboCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarTipoEmpresaAsiganacionCbo()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTipoEmpresaAsiganacionCboAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<string> ListarEmpresaPorTipoCbo(string idTipoEmpresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEmpresaPorTipoCboCsvAsync(idTipoEmpresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<string> ListarEmpresaGraficoHospedajeCsv(int FK_ID_tipoHabitacion)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEmpresaGraficoHospedajeCsvAsync(FK_ID_tipoHabitacion);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        //public async Task<string> ListarEmpresaGrafico(string idTipoEmpresa, string alojamiento = "")
        //{
        //    try
        //    {
        //        string rpta = "";
        //        string data = "";
        //        switch (idTipoEmpresa)
        //        {
        //            case "2":
        //                data = "CO|" + idTipoEmpresa;
        //                break;
        //            case "4":
        //                data = "LA|" + idTipoEmpresa;
        //                break;
        //            case "3":
        //                data = "AL|" + alojamiento;
        //                break;
        //        }

        //        ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
        //        rpta = await servicio.ListarEmpresaGraficoCsvAsync(data);
        //        return rpta;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw;
        //    }
        //}
        public async Task<string> ListarEmpresaGrafico(string idTipoEmpresa)
        {
            try
            {
                string rpta = "";
                string data = "";
                switch (idTipoEmpresa)
                {
                    case "2":
                        data = "CO|" + idTipoEmpresa;
                        break;
                    case "4":
                        data = "LA|" + idTipoEmpresa;
                        break;
                    case "3":
                        data = "AL|" + idTipoEmpresa;
                        break;
                }

                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEmpresaGraficoCsvAsync(data);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarServiciosAsignadosPorEmpresaECM(int FK_ID_EmpresaECM, int FK_ID_TipoEmpresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarServiciosAsignadosPorEmpresaECMCsvAsync(FK_ID_EmpresaECM, FK_ID_TipoEmpresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<string> ListarTrabajadorAsignacion(string idTipoEmpresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTrabajadorAsignacionCsvAsync(idTipoEmpresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> SPAsignacionMasivo(string data, string idUsuario, string op)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.SPAsignacionMasivoAsync(data, idUsuario, op);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarAlojamientoCboPorId(string idEmpresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarAlojamientoCboPorIdCsvAsync(idEmpresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarEmpresasEspecializadasCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEmpresasEspecializadasCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        
        public async Task<string> CargarExcel(HttpPostedFileBase file, string idUsuario, string fecha)
        {
            try
            {
                int rpta = 0;
                List<CargaMasiva> lstCarga = ImportarExcel.ExcelToList(file, "Trabajador", fecha);

                if (lstCarga.Count > 0)
                {
                    ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                    rpta = await servicio.TrabajadorCargaAsync(lstCarga.ToArray(), idUsuario);
                }

                if (rpta == 0)
                {
                    return "";
                }
                else
                {
                    return rpta.ToString();
                }
            }
            catch (Exception ex)
            {
                ObjetoLog.Grabar(ex.Message, ex.StackTrace);
                return "";
            }
        }
        #endregion
    }
}