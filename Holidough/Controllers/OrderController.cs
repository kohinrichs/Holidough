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

namespace Holidough.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public OrderController(IOrderRepository orderRepository, IUserProfileRepository userProfileRepository)
        {
            _orderRepository = orderRepository;
            _userProfileRepository = userProfileRepository;
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

        [HttpPost]
        // NEED TO Update CONFIRMATION NUMBER IN HERE
        public IActionResult AddOrder(Order order)
        {
            var currentUser = GetCurrentUserProfile();
            order.UserProfileId = currentUser.Id;
            DateTime dateOrderPlaced = DateTime.Now;

            order.DatePlaced = dateOrderPlaced;
            order.ConfirmationNumber = "test123";
            order.IsPickedUp = false;
            order.IsCanceled = false;
         
            _orderRepository.AddOrder(order);
            return CreatedAtAction("Get", new { id = order.Id }, order);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
