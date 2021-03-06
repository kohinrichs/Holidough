using Holidough.Models;
using Holidough.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Holidough.Repositories
{
    public class OrderItemRepository : BaseRepository, IOrderItemRepository
    {
        public OrderItemRepository(IConfiguration configuration) : base(configuration) { }

        // Get OrderItems By OrderId
        public List<OrderItem> GetOrderItemsByOrderId(int orderId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT oi.Id, oi.OrderId, oi.ItemId, oi.Quantity, oi.IsCanceled,
                        i.Id as ItemId, i.[Name] as ItemName, i.CategoryId as ItemCategoryId, i.Description as ItemDescription, i.Price as ItemPrice, i.IsDeleted as ItemIsDeleted,
                        c.Id as CategoryId, c.[Name] as CategoryName
                        FROM OrderItem oi
                        LEFT JOIN Item i on oi.ItemId = i.id
                        Left Join Category c on i.CategoryId = c.id 
                        WHERE oi.OrderId = @Id
                        ORDER BY CategoryName ASC, i.[Name]";

                    DbUtils.AddParameter(cmd, "@Id", orderId);

                    var reader = cmd.ExecuteReader();

                    var orderItems = new List<OrderItem>();

                    while (reader.Read())
                    {
                        orderItems.Add(NewOrderItemFromDb(reader));
                    }
                    reader.Close();

                    return orderItems;
                }
            }
        }

        public void AddOrderItem(OrderItem orderItem)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO OrderItem (ItemId, OrderId, Quantity, IsCanceled)
                        OUTPUT INSERTED.ID
                        VALUES (@ItemId, @OrderId, @Quantity, @IsCanceled)";

                    DbUtils.AddParameter(cmd, "@ItemId", orderItem.ItemId);
                    DbUtils.AddParameter(cmd, "@OrderId", orderItem.OrderId);
                    DbUtils.AddParameter(cmd, "@Quantity", orderItem.Quantity);
                    DbUtils.AddParameter(cmd, "@IsCanceled", orderItem.IsCanceled);

                    orderItem.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteOrderItem(int orderId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM OrderItem WHERE OrderId = @OrderId";

                    DbUtils.AddParameter(cmd, "@OrderId", orderId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        // To Make An OrderItem
        private OrderItem NewOrderItemFromDb(SqlDataReader reader)
        {
            return new OrderItem()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                OrderId = DbUtils.GetInt(reader, "OrderId"),
                ItemId = DbUtils.GetInt(reader, "ItemId"),
                Quantity = DbUtils.GetInt(reader, "Quantity"),
                IsCanceled = reader.GetBoolean(reader.GetOrdinal("IsCanceled")),
                Item = new Item()
                {
                    Id = DbUtils.GetInt(reader, "ItemId"),
                    Name = DbUtils.GetString(reader, "ItemName"),
                    CategoryId = DbUtils.GetInt(reader, "ItemCategoryId"),
                    Description = DbUtils.GetString(reader, "ItemDescription"),
                    Price = reader.GetDecimal(reader.GetOrdinal("ItemPrice")),
                    IsDeleted = reader.GetBoolean(reader.GetOrdinal("ItemIsDeleted")),
                    Category = new Category()
                    {
                        Id = DbUtils.GetInt(reader, "CategoryId"),
                        Name = DbUtils.GetString(reader, "CategoryName"),
                    }
                }
            };
        }
    }
}
