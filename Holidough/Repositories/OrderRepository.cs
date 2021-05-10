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
    public class OrderRepository : BaseRepository, IOrderRepository
    {
        public OrderRepository(IConfiguration configuration) : base(configuration) { }

        // Get All Orders By HolidayId; Also getting UserProfile
        public List<Order> GetAllOrdersByHolidayId(int holidayId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT o.Id, o.ConfirmationNumber, o.DatePlaced, o.UserProfileId, o.HolidayId, o.PickUpDateTime, o.IsPickedUp, o.IsCanceled,
                        up.Id as UpId, up.FirstName, up.LastName, up.PhoneNumber, up.Email
                        FROM [Order] o
                        LEFT JOIN UserProfile up on o.UserProfileId = up.Id
                        WHERE o.HolidayId = @Id
                        ORDER BY up.LastName ASC";

                    DbUtils.AddParameter(cmd, "@Id", holidayId);

                    var reader = cmd.ExecuteReader();
                    var orders = new List<Order>();
                    while (reader.Read())
                    {
                        orders.Add(NewOrderFromDb(reader));
                    }

                    reader.Close();

                    return orders;
                }
            }
        }

        // Get A Order By Its Id
        public Order GetOrderById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT o.Id, o.ConfirmationNumber, o.DatePlaced, o.UserProfileId, o.HolidayId, o.PickUpDateTime, o.IsPickedUp, o.IsCanceled,
                        up.Id as UpId, up.FirstName, up.LastName, up.PhoneNumber, up.Email
                        FROM [Order] o
                        LEFT JOIN UserProfile up on o.UserProfileId = up.Id
                        WHERE o.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Order order = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        order = NewOrderFromDb(reader);
                    }
                    reader.Close();

                    return order;
                }
            }
        }

        public List<Order> GetOrdersByUserProfileId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                     SELECT o.Id, o.ConfirmationNumber, o.DatePlaced, o.UserProfileId, o.HolidayId, o.PickUpDateTime, o.IsPickedUp, o.IsCanceled,
                        up.Id as UpId, up.FirstName, up.LastName, up.PhoneNumber, up.Email
                        FROM [Order] o
                        LEFT JOIN UserProfile up on o.UserProfileId = up.Id
                        WHERE o.UserProfileId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", userProfileId);

                    var reader = cmd.ExecuteReader();

                    var orders = new List<Order>();
                    while (reader.Read())
                    {
                        orders.Add(NewOrderFromDb(reader));
                    }

                    reader.Close();

                    return orders;
                }
            }
        }

        public void AddOrder(Order order)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [ORDER] (ConfirmationNumber, DatePlaced, UserProfileId, HolidayId, PickUpDateTime, IsPickedUp, IsCanceled)
                        OUTPUT INSERTED.ID
                        VALUES (@ConfirmationNumber, @DatePlaced, @UserProfileId, @HolidayId, @PickUpDateTime, @IsPickedUp, @IsCanceled)";

                    DbUtils.AddParameter(cmd, "@ConfirmationNumber", order.ConfirmationNumber);
                    DbUtils.AddParameter(cmd, "@DatePlaced", order.DatePlaced);
                    DbUtils.AddParameter(cmd, "@UserProfileId", order.UserProfileId);
                    DbUtils.AddParameter(cmd, "@HolidayId", order.HolidayId);
                    DbUtils.AddParameter(cmd, "@PickUpDateTime", order.PickUpDateTime);
                    DbUtils.AddParameter(cmd, "@IsPickedUp", order.IsPickedUp);
                    DbUtils.AddParameter(cmd, "@IsCanceled", order.IsCanceled);

                    order.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateOrder(Order order)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [ORDER] 
                            SET PickUpDateTime = @PickUpDateTime
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@PickUpDateTime", order.PickUpDateTime);
                    DbUtils.AddParameter(cmd, "@Id", order.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void CancelOrder(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [ORDER] 
                            SET IsCanceled = 1
                        WHERE Id = @Id;
                        UPDATE [OrderItem] 
                            SET IsCanceled = 1
                        WHERE orderId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        // need to pass in a holiday id from the select > use that to get all the order with that HolidayId and the all the orderItems with that orderId > 
        // need to send back to the client itemIds with the total quantity for that itemId

        // once you've gathered up all the orderItems > sort them by ItemId > then need to add all those quantities together
        public List<ItemQuantity> GetItemQuantitiesByHolidayId(int holidayId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                      SELECT SUBQUERY.ItemId as ItemId, SUM(SUBQUERY.Quantity) as ItemQuantity FROM
                            (SELECT oi.ItemId, oi.Quantity
                            FROM OrderItem oi
                            LEFT JOIN [Order] o on oi.OrderId = o.Id
                            WHERE HolidayId = @Id) AS SUBQUERY
                            Group By SUBQUERY.ItemId;";

                    DbUtils.AddParameter(cmd, "@Id", holidayId);

                    var reader = cmd.ExecuteReader();

                    var itemQuantities = new List<ItemQuantity>();

                    while (reader.Read())
                    {
                        itemQuantities.Add(new ItemQuantity()
                        {
                            ItemId = DbUtils.GetInt(reader, "ItemId"),
                            ItemQuantityNumber = DbUtils.GetInt(reader, "ItemQuantity"),
                        });
                    }

                    reader.Close();

                    return itemQuantities;
                }
            }
        }


        // New Order Object From DB
        private Order NewOrderFromDb(SqlDataReader reader)
        {
            return new Order()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                ConfirmationNumber = DbUtils.GetString(reader, "ConfirmationNumber"),
                DatePlaced = DbUtils.GetDateTime(reader, "DatePlaced"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                HolidayId = DbUtils.GetInt(reader, "HolidayId"),
                PickUpDateTime = DbUtils.GetString(reader, "PickUpDateTime"),
                IsPickedUp = reader.GetBoolean(reader.GetOrdinal("IsPickedUp")),
                IsCanceled = reader.GetBoolean(reader.GetOrdinal("IsCanceled")),
                UserProfile = new UserProfile()
                {
                    Id = DbUtils.GetInt(reader, "UpId"),
                    FirstName = DbUtils.GetString(reader, "FirstName"),
                    LastName = DbUtils.GetString(reader, "LastName"),
                    PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                    Email = DbUtils.GetString(reader, "Email"),
                }
            };
        }
    }
}
