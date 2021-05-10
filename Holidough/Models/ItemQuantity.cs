using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Models
{
    public class ItemQuantity
    {
        public int ItemId { get; set; }
        public int ItemQuantityNumber { get; set; }
        public Item Item { get; set; }
    }
}
