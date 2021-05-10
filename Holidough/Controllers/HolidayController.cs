using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Holidough.Repositories;
using Holidough.Models;
using System.Security.Claims;

namespace Holidough.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HolidayController : ControllerBase
    {
        private readonly IHolidayRepository _holidayRepository;
        private readonly IHolidayPickUpDayRepository _holidayPickUpDayRepository;
        private readonly IHolidayPickUpTimeRepository _holidayPickUpTimeRepository;
        private readonly IHolidayItemRepository _holidayItemRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public HolidayController(IHolidayRepository holidayRepository, IHolidayPickUpDayRepository holidayPickUpDayRepository, IHolidayPickUpTimeRepository holidayPickUpTimeRepository, IHolidayItemRepository holidayItemRepository, IUserProfileRepository userProfileRepository)
        {
            _holidayRepository = holidayRepository;
            _holidayPickUpDayRepository = holidayPickUpDayRepository;
            _holidayPickUpTimeRepository = holidayPickUpTimeRepository;
            _holidayItemRepository = holidayItemRepository;
            _userProfileRepository = userProfileRepository;
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

        [HttpGet("{id}")]
        public IActionResult GetHolidayById(int id)
        {
            return Ok(_holidayRepository.GetHolidayById(id));
        }

        [HttpPost]
        public IActionResult AddHoliday([FromBody] TotalHoliday totalHoliday)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.UserTypeId != 1)
            {
                return Unauthorized();
            }

            var holiday = totalHoliday.Holiday;
            var holidayPickUpDays = totalHoliday.HolidayPickUpDays;
            var holidayPickUpTimes = totalHoliday.HolidayPickUpTimes;
            var items = totalHoliday.HolidayItems;

            holiday.IsAvailable = false;

            _holidayRepository.AddHoliday(holiday);

            int holidayId = holiday.Id;

            foreach (int pickUpDayId in holidayPickUpDays)
            {
                _holidayPickUpDayRepository.AddHolidayPickUpDay(pickUpDayId, holidayId);
            }

            foreach (int pickUpTimeId in holidayPickUpTimes)
            {
                _holidayPickUpTimeRepository.AddHolidayPickUpTime(pickUpTimeId, holidayId);
            }

            foreach (var itemId in items)
            {
                var isDeleted = false;

                _holidayItemRepository.AddHolidayItem(itemId, holidayId, isDeleted);
            }
            return CreatedAtAction("GetHolidayById", new { id = holiday.Id }, holiday);
        }

        [HttpPut]
        public IActionResult UpdateOrder([FromBody] TotalHoliday totalHoliday)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.UserTypeId != 1)
            {
                return Unauthorized();
            }

            var holiday = totalHoliday.Holiday;
            var holidayPickUpDays = totalHoliday.HolidayPickUpDays;
            var holidayPickUpTimes = totalHoliday.HolidayPickUpTimes;
            var items = totalHoliday.HolidayItems;

            _holidayRepository.UpdateHoliday(holiday);

            var holidayId = holiday.Id;

            _holidayPickUpDayRepository.DeleteHolidayPickUpDay(holidayId);

            foreach (int pickUpDayId in holidayPickUpDays)
            {
                _holidayPickUpDayRepository.AddHolidayPickUpDay(pickUpDayId, holidayId);
            }

            _holidayPickUpTimeRepository.DeleteHolidayPickUpTime(holidayId);

            foreach (int pickUpTimeId in holidayPickUpTimes)
            {
                _holidayPickUpTimeRepository.AddHolidayPickUpTime(pickUpTimeId, holidayId);
            }

            //updateIsDeletedForOtherItems > change is deleted to true if not in the new array, add if not in the array
            // get currentHolidayItemsByHolidayId > check to see if the item Id already exists,
            // if the item is on the new list, but not in the database, the isDeleted needs to be changed to true

            _holidayItemRepository.SoftDeleteHolidayItem(holidayId);

            foreach (var itemId in items)
            {
                var isDeleted = false;

                _holidayItemRepository.AddHolidayItem(itemId, holidayId, isDeleted);
            }

            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateCheckBox(int id)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.UserTypeId != 1)
            {
                return Unauthorized();
            }

            _holidayRepository.UpdateCheckBox(id);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.UserTypeId != 1)
            {
                return Unauthorized();
            }

            _holidayRepository.DeleteHoliday(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
