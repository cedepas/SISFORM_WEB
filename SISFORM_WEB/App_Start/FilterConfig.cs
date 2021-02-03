using SISFORM_WEB.Filters;
using System.Web.Mvc;

namespace SISFORM_WEB
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new VerificaSession());
        }
    }
}
