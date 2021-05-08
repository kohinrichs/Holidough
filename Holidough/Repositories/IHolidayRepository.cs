using Holidough.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Repositories
{
    public interface IHolidayRepository
    {
        void AddHoliday(Holiday holiday);
        void DeleteHoliday(int id);
        List<Holiday> GetAllAvailableHolidays();
        List<Holiday> GetAllHolidays();
        Holiday GetHolidayById(int id);
        void UpdateHoliday(Holiday holiday);
    }
}
