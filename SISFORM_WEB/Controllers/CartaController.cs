using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Rotativa;
using SISFORM_WEB.ServicioWcf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SISFORM_WEB.Controllers
{
    public class CartaController : Controller
    {
        // GET: Carta
        public ActionResult CartaPreocupacion()
        {
            return View();
        }

        public PartialViewResult _CartaPreocupacionPV()
        {
            return PartialView();
        }
        public async Task<string> ListarIncidenciasAbiertasPorECMCsv(int ID_Empresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarIncidenciasAbiertasPorECMCsvAsync(ID_Empresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ObenerterCorrelativoCartaECMCsv(int ID_Empresa)
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ObenerterCorrelativoCartaECMCsvAsync(ID_Empresa);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        public async Task<string> ListarCartasPreocupacionCsv()
        {
            try
            {
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.ListarCartasPreocupacionCsvAsync();
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public class datosCartaPresentacion
        {
            public string dataPDF { get; set; }
            public int FK_ID_EmpresaECM { get; set; }
            public string fechaCarta { get; set; }
            public int correlativoCarta { get; set; }
            public int usuario { get; set; }
        }
        public async Task<int> GrabarCarta(datosCartaPresentacion odatosCartaPresentacion)
        {
            try
            {
                /*Para convertir la Vista Parcial en PDF
                var viewAsPdf = new ViewAsPdf("_CartaPreocupacionPV", "hola")
                {
                    FileName = "pruebaNombre.pdf",
                    //PageSize = Size.A4,
                    PageMargins = { Left = 1, Right = 1 }
                };
                var pdfBytes = viewAsPdf.BuildFile(ControllerContext);
                */
                byte[] pdfBytes = Convert.FromBase64String(odatosCartaPresentacion.dataPDF);
                String keys = CloudConfigurationManager.GetSetting("ConexionStoreAzure");
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(keys);
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference("storecartas");
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(odatosCartaPresentacion.FK_ID_EmpresaECM +"-"+ odatosCartaPresentacion.fechaCarta+"-"+ odatosCartaPresentacion.correlativoCarta+".pdf");
                blockBlob.UploadFromByteArray(pdfBytes, 0, pdfBytes.Length);

                CartaPreocupacion ocartaPreocupacion = new CartaPreocupacion();
                ocartaPreocupacion.FK_ID_EmpresaECM = odatosCartaPresentacion.FK_ID_EmpresaECM;
                ocartaPreocupacion.fechaCarta= odatosCartaPresentacion.fechaCarta;
                ocartaPreocupacion.correlativoCarta = odatosCartaPresentacion.correlativoCarta;
                ocartaPreocupacion.FK_ID_UsuarioCrea = odatosCartaPresentacion.usuario;
                //var attachment = new Attachment(new MemoryStream(pdfBytes), "pruebaNombre.pdf");
                //email.Attachments.Add(attachment);
                int rpta;
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                rpta = await servicio.CartaPreocupacionOperacionAsync(ocartaPreocupacion, "I");
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}