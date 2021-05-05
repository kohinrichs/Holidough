using Holidough.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Repositories
{
    public interface IOrderRepository
    {
        void AddOrder(Order order);
        List<Order> GetAllOrdersByHolidayId(int holidayId);
        Order GetOrderById(int id);
        List<Order> GetOrdersByUserProfileId(int userProfileId);
        void UpdateOrder(Order order);
    }
}
