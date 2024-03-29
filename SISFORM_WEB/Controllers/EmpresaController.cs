﻿using SISFORM_WEB.Filters;
using SISFORM_WEB.ServicioWcf;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SISFORM_WEB.Controllers
{
    [AutorizacionModulos("2")]
    public class EmpresaController : Controller
    {
        // GET: Empresa
        public ActionResult Operacion()
        {
            ViewBag.Title = "Empresa";
            return View();
        }
        public ActionResult Directorio()
        {
            ViewBag.Title = "Directorio";
            return View();
        }
        public async Task<string> ListarEmpresa()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEmpresaCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarEmpresaPorTipoCboCsv(string idTipoEmpresa)
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
        public async Task<string> ListarDetallesEmpresasHospedajesCboCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarDetallesEmpresasHospedajesCboCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
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
        public async Task<string> ListarTipoEstadoRegimenUnidadGestionEmpresaCboCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTipoEstadoRegimenUnidadGestionEmpresaCboCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        
        public async Task<string> ListarEstadoEmpresaCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEstadoEmpresaCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        #region Mantenimiento
        public async Task<string> ListarProgresoEmpresaCsv(string idEmpresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarProgresoEmpresaCsvAsync(idEmpresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarDirectorioECMCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarDirectorioECMCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        
        public async Task<string> ObtenerEmpresaPorIdCsv(string idEmpresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObtenerEmpresaPorIdCsvAsync(idEmpresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ObtenerDetallesEmpresaHospedajesPorIdCsv(int FK_ID_Empresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObtenerDetallesEmpresaHospedajesPorIdCsvAsync(FK_ID_Empresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ObtenerDirectorioECMPorId(int idDirectorioECM)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObtenerDirectorioECMPorIdAsync(idDirectorioECM);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
       
        
        public async Task<string> Grabar(Empresa  oEmpresa)
        {
            int rpta = 0;
            string op = "";
            if (oEmpresa.ID_Empresa == 0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.EmpresaOperacionAsync(oEmpresa, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }
        public async Task<string> SPDirectorioECM(DirectorioECM oEmpresaECM)
        {
            int rpta = 0;
            string op = "";
            if (oEmpresaECM.ID_DirectorioECM == 0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.DirectorioECMOperacionAsync(oEmpresaECM, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }
        public async Task<string> GrabarDetalleEmpresasHospedajes(DetalleEmpresa oDetalleEmpresa, string op)
        {
            int rpta = 0;
            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.DetalleEmpresaOperacionAsync(oDetalleEmpresa, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }
        public async Task<string> GrabarObservacion(ProgresoEmpresa oProgresoEmpresa)
        {
            int rpta = 0;
            string op = "";
            if (oProgresoEmpresa.ID_Progreso == 0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.ProgresoEmpresaOperacionAsync(oProgresoEmpresa, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }
        public async Task<string> GrabarCriterio1(Criterio1 oCriterio1)
        {
            int rpta = 0;
            string op = "";
            if (oCriterio1.ID_Criterio1 == 0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.Criterio1OperacionAsync(oCriterio1, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }
        public async Task<string> GrabarCriterio2(Criterio2 oCriterio2)
        {
            int rpta = 0;
            string op = "";
            if (oCriterio2.ID_Criterio2 == 0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.Criterio2OperacionAsync(oCriterio2, op);
            if (rpta == 0)
            {
                return "";
            }
            else
            {
                return rpta.ToString();
            }
        }
        public async Task<string> GrabarCriterio3(Criterio3 oCriterio3)
        {
            int rpta = 0;
            string op = "";
            if (oCriterio3.ID_Criterio3 == 0)
            {
                op = "I";
            }
            else
            {
                op = "U";
            }

            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.Criterio3OperacionAsync(oCriterio3, op);
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

    }
}