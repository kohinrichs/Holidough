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
    public class HolidayPickUpTimeController : ControllerBase
    {
        private readonly IHolidayPickUpTimeRepository _holidayPickUpTimeRepository;
        public HolidayPickUpTimeController(IHolidayPickUpTimeRepository holidayPickUpTimeRepository)
        {
            _holidayPickUpTimeRepository = holidayPickUpTimeRepository;
        }

        [HttpGet("{holidayId}")]
        public IActionResult GetHolidayPickUpTimesByHolidayId(int holidayId)
        {
            return Ok(_holidayPickUpTimeRepository.GetHolidayPickUpTimesByHolidayId(holidayId));
        }
    }
}
