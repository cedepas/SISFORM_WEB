using System;
using System.Web;
using System.Web.Mvc;

namespace SISFORM_WEB.Filters
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class AutorizacionModulos : AuthorizeAttribute
    {
        int autorizado = 0;
        string modulo = "";
        public AutorizacionModulos(string modulo)
        {
            this.modulo = modulo;
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            try
            {
                autorizado = 0;
                string permisos = (string)HttpContext.Current.Session["userPermision"];
                if (!string.IsNullOrEmpty(permisos))
                {
                    string[] modulos = permisos.Split('¬');
                    string[] campos;
                    int nModulos = modulos.Length;
                    for (int i = 0; i < nModulos; i++)
                    {
                        campos = modulos[i].Split('|');

                        if (modulo == campos[0])
                        {
                            int nCampos = campos.Length;
                            for (int j = 1; j < nCampos; j++)
                            {
                                if (campos[j] == "S")
                                {
                                    autorizado++;
                                    break;
                                }
                            }
                        }
                    }
                }

                if (autorizado == 0)
                {
                    filterContext.Result = new RedirectResult("~/Home/Inicio");
                }
            }
            catch (Exception ex)
            {
                filterContext.Result = new RedirectResult("~/Home/Inicio");
            }
        }
    }
}