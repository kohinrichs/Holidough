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
    public class PickUpTimeRepository : BaseRepository, IPickUpTimeRepository
    {
        public PickUpTimeRepository(IConfiguration configuration) : base(configuration) { }

        public List<PickUpTime> GetAllPickUpTimes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Time]
                        FROM PickUpTime
                    ";

                    var reader = cmd.ExecuteReader();
                    var pickUpTimes = new List<PickUpTime>();

                    while (reader.Read())
                    {
                        pickUpTimes.Add(NewPickUpTimeFromDb(reader));
                    }
                    reader.Close();
                    return pickUpTimes;
                }
            }
        }

        private PickUpTime NewPickUpTimeFromDb(SqlDataReader reader)
        {
            return new PickUpTime()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Time = DbUtils.GetString(reader, "Time"),

            };
        }
    }
}

