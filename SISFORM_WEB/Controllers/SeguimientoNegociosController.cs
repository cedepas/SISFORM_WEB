﻿using SISFORM_WEB.ServicioWcf;
using System;
using System.Threading.Tasks;
using System.Web.Mvc;
using Dominio;
using System.Collections.Generic;

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
            int preguntas=0;
            ViewBag.Title = "CheckList";
            ViewBag.TotalPreguntas = numeroDePreguntas(preguntas);
            return View();
        }
        public int numeroDePreguntas(int numeroPreguntas)
        {
            return numeroPreguntas;
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
        public async Task<string> ListarTipoOperacionEmpresaCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                numeroDePreguntas(20);
                rpta = await servicio.ListarEstadoInspeccionCsvAsync();
                //rpta = await servicio.ListarTipoOperacionEmpresaCsvAsync();

                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        

    }
}
