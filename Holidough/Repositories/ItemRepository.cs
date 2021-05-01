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
    public class ItemRepository : BaseRepository, IItemRepository
    {
        public ItemRepository(IConfiguration configuration) : base(configuration) { }

        // Get All Items
        public List<Item> GetAllItems()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.Id, i.[Name], i.CategoryId, i.[Description], i.Price, i.IsDeleted,
                        c.[Name] as CategoryName
                        FROM Item i
                        Left Join Category c on i.CategoryId = c.id 
                        ORDER BY CategoryName ASC, i.[Name]";

                    var reader = cmd.ExecuteReader();
                    var items = new List<Item>();
                    while (reader.Read())
                    {
                        items.Add(NewItemFromDb(reader));
                    }

                    reader.Close();

                    return items;
                }
            }
        }

        // Get A Item By Id
        public Item GetItemById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.Id, i.[Name], i.CategoryId, i.[Description], i.Price, i.IsDeleted,
                        c.[Name] as CategoryName
                        FROM Item i
                        Left Join Category c on i.CategoryId = c.id 
                        WHERE i.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Item item = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        item = NewItemFromDb(reader);
                    }
                    reader.Close();

                    return item;
                }
            }
        }

        // Get Item By CategoryId 
        public List<Item> GetItemsByCategoryId(int categoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT i.Id, i.[Name], i.CategoryId, i.[Description], i.Price, i.IsDeleted,
                        c.[Name] as CategoryName
                        FROM Item i
                        Left Join Category c on i.CategoryId = c.id 
                        WHERE i.CategoryId = @Id
                        ORDER By i.[Name]";

                    DbUtils.AddParameter(cmd, "@Id", categoryId);

                    var reader = cmd.ExecuteReader();

                    var items = new List<Item>();

                    while (reader.Read())
                    {
                            items.Add(NewItemFromDb(reader));
                    }
                    reader.Close();

                    return items;
                }
            }
        }
        // To Make An Item
        private Item NewItemFromDb(SqlDataReader reader)
        {
            return new Item()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                Description = DbUtils.GetString(reader, "Description"),
                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                IsDeleted = reader.GetBoolean(reader.GetOrdinal("IsDeleted")),
                Category = new Category ()
                {
                    Id = DbUtils.GetInt(reader, "CategoryId"),
                    Name = DbUtils.GetString(reader, "CategoryName"),
                }
            };
        }
    }
}
