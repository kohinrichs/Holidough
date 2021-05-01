using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Models
{
    public class HolidayPickUpDay
    {
        public int Id { get; set; }
        [Required]
        public int HolidayId { get; set; }
        [Required]
        public int PickUpDayId { get; set; }
        public PickUpDay PickUpDayName{ get; set; }
    }
}
