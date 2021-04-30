using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Models
{
    public class Holiday
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public bool IsAvailable { get; set; }
        public List<HolidayPickUpDay> HolidayPickUpDays { get; set; }
        public List<HolidayPickUpTime> HolidayPickUpTimes { get; set; }
    }
}
