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
            ViewBag.Nombre = "este es un nombre";
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

        public class dataDelPdf
        {
            public string dataPDF { get; set; }
            
        }
        public async Task<string> GrabarCarta(dataDelPdf odataDelPdf)
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
                byte[] pdfBytes = Convert.FromBase64String(odataDelPdf.dataPDF);
                String keys = CloudConfigurationManager.GetSetting("ConexionStoreAzure");
                CloudStorageAccount storageAccount = CloudStorageAccount.Parse(keys);
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference("storecartas");
                CloudBlockBlob blockBlob = container.GetBlockBlobReference("pruebaCarta.pdf");
                blockBlob.UploadFromByteArray(pdfBytes, 0, pdfBytes.Length);

                //var attachment = new Attachment(new MemoryStream(pdfBytes), "pruebaNombre.pdf");
                //email.Attachments.Add(attachment);
                string rpta = "";
                ServicioClient servicio = new ServicioClient("BasicHttpBinding_IServicio");
                int datito = 1;
                rpta = await servicio.ListarIncidenciasAbiertasPorECMCsvAsync(datito);
                return rpta;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}