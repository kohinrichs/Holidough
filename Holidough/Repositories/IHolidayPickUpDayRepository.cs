using Holidough.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Repositories
{
    public interface IHolidayPickUpDayRepository
    {
        void AddHolidayPickUpDay(int pickUpDayId, int holidayId);
        void DeleteHolidayPickUpDay(int holidayId);
        List <HolidayPickUpDay> GetHolidayPickUpDaysByHolidayId(int holidayId);
    }
}
