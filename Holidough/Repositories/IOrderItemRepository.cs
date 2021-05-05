using Holidough.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Repositories
{
    public interface IOrderItemRepository
    {
        void AddOrderItem(OrderItem orderItem);
        void DeleteOrderItem(int orderId);
        List<OrderItem> GetOrderItemsByOrderId(int orderId);
    }
}
