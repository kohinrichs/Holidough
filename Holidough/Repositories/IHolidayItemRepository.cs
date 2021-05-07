using Holidough.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Repositories
{
    public interface IHolidayItemRepository
    {
        void AddHolidayItem(int itemId, int holidayId, bool isDeleted);
        List<HolidayItem> GetHolidayItemsByHolidayId(int holidayId);
        void SoftDeleteHolidayItem(int holidayId);
    }
}
