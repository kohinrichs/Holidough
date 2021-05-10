using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    public class HolidayItemController : ControllerBase
    {
        private readonly IHolidayItemRepository _holidayItemRepository;
        public HolidayItemController(IHolidayItemRepository holidayItemRepository)
        {
            _holidayItemRepository = holidayItemRepository;
        }

        [HttpGet("getbyholidayid/{holidayId}")]
        public IActionResult GetHolidayItemsByHolidayId(int holidayId)
        {
            return Ok(_holidayItemRepository.GetHolidayItemsByHolidayId(holidayId));
        }
    }
}
