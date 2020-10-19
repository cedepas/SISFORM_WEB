using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SISFORM_WEB.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Inicio()
        {
            ViewBag.Title = "Inicio";
            return View();
        }

        public ActionResult Prueba()
        {
            ViewBag.Title = "Prueba";

            return View();
        }
    }
}