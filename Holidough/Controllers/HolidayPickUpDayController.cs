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
    public class HolidayPickUpDayController : ControllerBase
    {
        private readonly IHolidayPickUpDayRepository _holidayPickUpDayRepository;
        public HolidayPickUpDayController(IHolidayPickUpDayRepository holidayPickUpDayRepository)
        {
            _holidayPickUpDayRepository = holidayPickUpDayRepository;
        }

        [HttpGet("{holidayId}")]
        public IActionResult GetHolidayPickUpDaysByHolidayId(int holidayId)
        {
            return Ok(_holidayPickUpDayRepository.GetHolidayPickUpDaysByHolidayId(holidayId));
        }
    }
}
