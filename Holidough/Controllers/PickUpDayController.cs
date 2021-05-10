using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Holidough.Repositories;

namespace Holidough.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PickUpDayController : ControllerBase
    {
        private readonly IPickUpDayRepository _pickUpDayRepository;
        public PickUpDayController(IPickUpDayRepository pickUpDayRepository)
        {
            _pickUpDayRepository = pickUpDayRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_pickUpDayRepository.GetAllPickUpDays());
        }
    }
}
