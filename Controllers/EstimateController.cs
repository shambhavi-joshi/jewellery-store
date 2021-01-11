using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyTestApp.Models;
using System.Text.Json;
using System.Threading.Tasks;

namespace MyTestApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstimateController : ControllerBase
    {
        [HttpPost]
        [ProducesResponseType(typeof(EstimateModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post(EstimateModel estimateModel)
        {
            if (ModelState.IsValid)
            {
                estimateModel.TotalPrice = estimateModel.Rate * estimateModel.Weight;

                if (estimateModel.Discount.HasValue)
                {
                    estimateModel.TotalPrice = (decimal)(estimateModel.TotalPrice - estimateModel.Discount);
                }

                return Ok(estimateModel);
            }

            return BadRequest(ModelState);
        }
    }
}
