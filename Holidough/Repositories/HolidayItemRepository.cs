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
        public class HolidayItemRepository : BaseRepository, IHolidayItemRepository
        {
            public HolidayItemRepository(IConfiguration configuration) : base(configuration) { }

        // Get HolidayItems By Holiday Id
        public List <HolidayItem> GetHolidayItemsByHolidayId(int holidayId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT hi.Id, hi.HolidayId, hi.ItemId, hi.IsDeleted as HolidayItemIsDeleted,
                        i.Id as ItemId, i.[Name] as ItemName, i.CategoryId as ItemCategoryId, i.Description as ItemDescription, i.Price as ItemPrice, i.IsDeleted as ItemIsDeleted,
                        c.Id as CategoryId, c.[Name] as CategoryName
                        FROM HolidayItem hi
                        LEFT JOIN Item i on hi.ItemId = i.id
                        Left Join Category c on i.CategoryId = c.id 
                        WHERE hi.HolidayId = 1 AND hi.IsDeleted = 0
                        ORDER BY CategoryName ASC, i.[Name]";

                    DbUtils.AddParameter(cmd, "@Id", holidayId);

                    var reader = cmd.ExecuteReader();

                    var holidayItems = new List<HolidayItem>();

                    while (reader.Read())
                    {
                        holidayItems.Add(NewHolidayItemFromDb(reader));
                    }
                    reader.Close();

                    return holidayItems;
                }
            }
        }

        // To Make An Item
        private HolidayItem NewHolidayItemFromDb(SqlDataReader reader)
        {
            return new HolidayItem()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                HolidayId = DbUtils.GetInt(reader, "HolidayId"),
                ItemId = DbUtils.GetInt(reader, "ItemId"),
                IsDeleted = reader.GetBoolean(reader.GetOrdinal("HolidayItemIsDeleted")),
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
