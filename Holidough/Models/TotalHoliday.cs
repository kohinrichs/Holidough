using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Models
{
    public class TotalHoliday
    {
        public Holiday Holiday { get; set; }
        public List<int> HolidayPickUpDays { get; set; }
        public List<int> HolidayPickUpTimes{ get; set; }
        public List<int> HolidayItems { get; set; }
    }
}
