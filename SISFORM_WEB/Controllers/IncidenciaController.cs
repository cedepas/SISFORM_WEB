
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using SISFORM_WEB.Filters;
using SISFORM_WEB.ServicioWcf;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace SISFORM_WEB.Controllers
{
    [AutorizacionModulos("5")]
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
            catch (Exception ex)
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
                rpta = await servicio.ListarEspecificacionCsvAsync(idCategoria, idBloque);
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
        public async Task<string> ListarTrabajadorBusquedaCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarTrabajadorBusquedaCsvAsync();
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarEmpresaBusquedaCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarEmpresaBusquedaCsvAsync();
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
        public async Task<string> EnviarCorreoSolucion(string idIncidencia)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ConstruirCorreoSolucionAsync(idIncidencia);
                return rpta;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public class imgencito
        {
            public string imagen { get; set; }
            public string tipoimagen { get; set; }
            public string cabeseraImg { get; set; }
            public int ID_Incidencia { get; set; }
            public int ID_TipoSolucion { get; set; }
            public int FK_ID_TrabajadorSoluciona { get; set; }
            public string detalleSolucion { get; set; }
        }
        public async Task<string> GuardarImagenStore(imgencito oimgencito)
        {
            string imagen = oimgencito.cabeseraImg + oimgencito.imagen;
            string tipodeImagen = oimgencito.tipoimagen.Substring(6, 3);
            string fecha = DateTime.Now.ToString("yyyyMMdd");
            string nombreImagen = oimgencito.ID_Incidencia.ToString() + '-' + '2' + '-' + oimgencito.FK_ID_TrabajadorSoluciona.ToString() + '-' + fecha;
            Image img;
            img = Base64ToImage(oimgencito.imagen);
            byte[] bytes = CopyImageToByteArray(img);
            String keys = CloudConfigurationManager.GetSetting("ConexionStoreAzure");
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(keys);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference("imagenesincidenai");
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(nombreImagen + "." + tipodeImagen);
            blockBlob.UploadFromByteArray(bytes, 0, bytes.Length);

            Solucion oSolucion = new Solucion();
            oSolucion.ID_Incidencia = oimgencito.ID_Incidencia;
            oSolucion.ID_TipoSolucion = oimgencito.ID_TipoSolucion;
            oSolucion.FK_ID_TrabajadorSoluciona = oimgencito.FK_ID_TrabajadorSoluciona;
            oSolucion.detalleSolucion = oimgencito.detalleSolucion;
            oSolucion.imagen = nombreImagen;

            string rpta = "";
            rpta = await RegistrarSolucion(oSolucion);

            return rpta;
        }
        public static byte[] CopyImageToByteArray(Image theImage)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                theImage.Save(memoryStream, ImageFormat.Png);
                return memoryStream.ToArray();
            }
        }
        public Image Base64ToImage(string base64String)
        {
            // Convert Base64 String to byte[] 
            byte[] imageBytes = Convert.FromBase64String(base64String);
            MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);

            // Convert byte[] to Image 
            ms.Write(imageBytes, 0, imageBytes.Length);
            Image image = Image.FromStream(ms, true);

            return image;
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
        public async Task<string> IncidenciaImagen(imgencito oimgencito)
        {
            string imagen = oimgencito.cabeseraImg + oimgencito.imagen;
            string tipodeImagen = oimgencito.tipoimagen.Substring(6, 3);
            string fecha = DateTime.Now.ToString("yyyyMMdd");
            string nombreImagen = oimgencito.ID_Incidencia.ToString() + '-' + '1' + '-' + oimgencito.FK_ID_TrabajadorSoluciona.ToString() + '-' + fecha;
            Image img;
            img = Base64ToImage(oimgencito.imagen);
            byte[] bytes = CopyImageToByteArray(img);
            String keys = CloudConfigurationManager.GetSetting("ConexionStoreAzure");
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(keys);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference("imagenesincidenai");
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(nombreImagen + "." + tipodeImagen);
            blockBlob.UploadFromByteArray(bytes, 0, bytes.Length);


            Imagen oImagen = new Imagen();
            oImagen.FK_ID_Incidencia = oimgencito.ID_Incidencia;
            oImagen.imagen = nombreImagen;
            oImagen.FK_ID_TipoImagen = 1;
            oImagen.FK_ID_SolucionIncidencia = 0;
            oImagen.ID_ImagenIncidencia = 0;

            int rpta = 0;
            string op = "";
            op = "I";
            ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
            rpta = await servicio.IncidenciaImagenAsync(oImagen, op);

            return rpta.ToString();
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
    }
}