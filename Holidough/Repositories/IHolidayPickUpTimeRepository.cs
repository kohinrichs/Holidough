using Holidough.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Repositories
{
    public interface IHolidayPickUpTimeRepository
    {
        HolidayPickUpTime GetHolidayPickUpTimesByHolidayId(int holidayId);
    }
}
