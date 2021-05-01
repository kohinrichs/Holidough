using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Models
{
    public class HolidayItem
    {
        public int Id { get; set; }

        [Required]
        public int ItemId { get; set; }
        [Required]
        public int HolidayId { get; set; }
        [Required]
        public bool IsDeleted { get; set; }
        public Item Item { get; set; }

    }
}
