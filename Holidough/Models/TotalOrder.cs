using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Models
{
    public class TotalOrder
    {
            public Order Order { get; set; }
            public List<OrderItem> OrderItems { get; set; }
    }
}
