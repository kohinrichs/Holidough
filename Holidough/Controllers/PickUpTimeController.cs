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
    public class PickUpTimeController : ControllerBase
    {
        private readonly IPickUpTimeRepository _pickUpTimeRepository;
        public PickUpTimeController(IPickUpTimeRepository pickUpTimeRepository)
        {
            _pickUpTimeRepository = pickUpTimeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_pickUpTimeRepository.GetAllPickUpTimes());
        }
    }
}
