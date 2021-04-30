using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Models
{
    public class HolidayPickUpTime
    {
        public int Id { get; set; }
        [Required]
        public int HolidayId { get; set; }
        [Required]
        public int PickUpTimeId { get; set; }
        public List<PickUpTime> PickUpTimeTimes { get; set; }
    }
}
