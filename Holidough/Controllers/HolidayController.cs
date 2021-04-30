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
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HolidayController : ControllerBase
    {
        private readonly IHolidayRepository _holidayRepository;
        public HolidayController(IHolidayRepository holidayRepository)
        {
            _holidayRepository = holidayRepository;
        }

        [HttpGet]
        public IActionResult GetAllHolidays ()
        {
            return Ok(_holidayRepository.GetAllHolidays());
        }

        [HttpGet("available")]
        public IActionResult GetAllAvailableHolidays()
        {
            return Ok(_holidayRepository.GetAllAvailableHolidays());
        }

        [HttpGet("getbyid/{id}")]
        public IActionResult GetHolidayById(int id)
        {
            return Ok(_holidayRepository.GetHolidayById(id));
        }
    }
}
