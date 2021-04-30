
using Dominio;
using SISFORM_WEB.Controllers;
using SISFORM_WEB.ServicioWcf;
using System;
using System.Web;
using System.Web.Mvc;

namespace SISFORM_WEB.Filters
{
    public class VerificaSession : ActionFilterAttribute
    {
        private VistaUsuario oVistaUsuario;
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                base.OnActionExecuting(filterContext);
                oVistaUsuario = (VistaUsuario)HttpContext.Current.Session["userAuthorize"];
                if (oVistaUsuario == null)
                {
                    if (filterContext.Controller is IniciarSesionController == false)
                    {
                        filterContext.HttpContext.Response.Redirect("~/IniciarSesion/Inicio");
                    }
                }
            }
            catch (Exception)
            {
                filterContext.Result = new RedirectResult("~/IniciarSesion/Inicio");
            }
        }
    }
}