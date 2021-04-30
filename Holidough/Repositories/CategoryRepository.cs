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
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name]
                        FROM Category
                        ORDER BY [Name]
                    ";

                    var reader = cmd.ExecuteReader();
                    var categories = new List<Category>();

                    while (reader.Read())
                    {
                        categories.Add(NewCategoryFromDb(reader));
                    }
                    reader.Close();
                    return categories;
                }
            }
        }

            private Category NewCategoryFromDb(SqlDataReader reader)
            {
                return new Category()
                {
                    Id = DbUtils.GetInt(reader, "Id"),
                    Name = DbUtils.GetString(reader, "Name"),

                };
            }
        }
    }
