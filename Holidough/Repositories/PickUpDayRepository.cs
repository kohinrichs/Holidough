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
    public class PickUpDayRepository : BaseRepository, IPickUpDayRepository
    {
        public PickUpDayRepository(IConfiguration configuration) : base(configuration) { }

        public List<PickUpDay> GetAllPickUpDays()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Day]
                        FROM PickUpDay
                    ";

                    var reader = cmd.ExecuteReader();
                    var pickUpDays = new List<PickUpDay>();

                    while (reader.Read())
                    {
                        pickUpDays.Add(NewPickUpDayFromDb(reader));
                    }
                    reader.Close();
                    return pickUpDays;
                }
            }
        }

        private PickUpDay NewPickUpDayFromDb(SqlDataReader reader)
        {
            return new PickUpDay()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Day = DbUtils.GetString(reader, "Day"),

            };
        }
    }
}
