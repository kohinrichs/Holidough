using Holidough.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Repositories
{
    public interface IHolidayPickUpTimeRepository
    {
        void AddHolidayPickUpTime(int pickUpTimeId, int holidayId);
        void DeleteHolidayPickUpTime(int holidayId);
        List <HolidayPickUpTime> GetHolidayPickUpTimesByHolidayId(int holidayId);
    }
}
