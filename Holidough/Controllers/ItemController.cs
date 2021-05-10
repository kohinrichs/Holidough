using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Holidough.Repositories;

namespace Holidough.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepository;
        public ItemController(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        [HttpGet]
        public IActionResult GetAllItems()
        {
            return Ok(_itemRepository.GetAllItems());
        }

        [HttpGet("getbyid/{id}")]
        public IActionResult GetItemById(int id)
        {
            return Ok(_itemRepository.GetItemById(id));
        }

        [HttpGet("getbycategoryid/{categoryId}")]
        public IActionResult GetItemsByCategoryId(int categoryId)
        {
            return Ok(_itemRepository.GetItemsByCategoryId(categoryId));
        }
    }
}
