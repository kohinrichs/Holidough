using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Models
{
    public class Order
    {
        public int Id { get; set; }
        
        [Required]
        public string ConfirmationNumber { get; set; }
        
        [Required]
        public DateTime DatePlaced { get; set; }
        
        [Required]
        public int UserProfileId { get; set; }
        
        [Required]
        public int HolidayId { get; set; }
       
        [Required]
        public string PickUpDateTime { get; set; }

        [Required]
        public bool IsPickedUp { get; set; }
        public bool IsCanceled { get; set; }
        public UserProfile UserProfile { get; set; }
        public Holiday Holiday { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}
