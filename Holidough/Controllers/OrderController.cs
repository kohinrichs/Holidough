using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Holidough.Repositories;
using Holidough.Models;
using System.Security.Claims;
using static Holidough.Models.Order;

namespace Holidough.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IOrderItemRepository _orderItemRepository;
        public OrderController(IOrderRepository orderRepository, IUserProfileRepository userProfileRepository, IOrderItemRepository orderItemRepository)
        {
            _orderRepository = orderRepository;
            _userProfileRepository = userProfileRepository;
            _orderItemRepository = orderItemRepository;
        }

        [HttpGet("holiday/{holidayId}")]
        public IActionResult GetAllOrdersByHolidayId(int holidayId)
        {
            return Ok(_orderRepository.GetAllOrdersByHolidayId(holidayId));
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            return Ok(_orderRepository.GetOrderById(id));
        }

        [HttpGet("userProfileId")]
        public IActionResult GetPostByUserProfileId()
        {
            var currentUser = GetCurrentUserProfile();
            var userProfileId = currentUser.Id;

            var orders = _orderRepository.GetOrdersByUserProfileId(userProfileId);
            if (orders == null)
            {
                return NotFound();
            }
            return Ok(orders);
        }

        [HttpPost]
        // NEED TO Update CONFIRMATION NUMBER IN HERE
        public IActionResult AddOrder([FromBody] TotalOrder totalOrder)
        {
            var order = totalOrder.Order;
            var orderItems = totalOrder.OrderItems;

            var currentUser = GetCurrentUserProfile();
            order.UserProfileId = currentUser.Id;
            DateTime dateOrderPlaced = DateTime.Now;

            order.DatePlaced = dateOrderPlaced;
            order.ConfirmationNumber = "test123";
            order.IsPickedUp = false;
            order.IsCanceled = false;
         
            _orderRepository.AddOrder(order);

            foreach (var orderItem in orderItems)
                {
                orderItem.OrderId = order.Id;
                orderItem.IsCanceled = false;

                    _orderItemRepository.AddOrderItem(orderItem);
                }

                return CreatedAtAction("GetOrderById", new { id = order.Id }, order);
        }

        [HttpPut]
        public IActionResult UpdateOrder([FromBody] TotalOrder totalOrder)
        {
            var order = totalOrder.Order;
            var orderItems = totalOrder.OrderItems;

            _orderRepository.UpdateOrder(order);
            
            _orderItemRepository.DeleteOrderItem(order.Id);

            foreach (var orderItem in orderItems)
            {
                orderItem.OrderId = order.Id;
                orderItem.IsCanceled = false;

                _orderItemRepository.AddOrderItem(orderItem);
            }

            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult CancelOrder(int id)
        {
            _orderRepository.CancelOrder(id);

            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
