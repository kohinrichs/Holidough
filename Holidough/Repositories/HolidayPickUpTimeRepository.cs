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
    public class HolidayPickUpTimeRepository : BaseRepository, IHolidayPickUpTimeRepository
    {
        public HolidayPickUpTimeRepository(IConfiguration configuration) : base(configuration) { }

        // Get PickUp Times By Holiday Id
        public List <HolidayPickUpTime> GetHolidayPickUpTimesByHolidayId(int holidayId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT hpt.Id, hpt.PickUpTimeId, hpt.HolidayId,
                        pt.id as PickUpTimeId, pt.[Time]
                        FROM HolidayPickUpTime hpt
                        LEFT JOIN PickUpTime pt on pt.id = hpt.PickUpTimeId
                        WHERE hpt.HolidayId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", holidayId);

                    var reader = cmd.ExecuteReader();

                    var holidayPickUpTimes = new List<HolidayPickUpTime>();

                    while (reader.Read())
                    {
                        holidayPickUpTimes.Add(NewHolidayPickUpTimeFromDb(reader));
                    }
                    reader.Close();

                    return holidayPickUpTimes;
                }
            }
        }
        private HolidayPickUpTime NewHolidayPickUpTimeFromDb(SqlDataReader reader)
        {
            return new HolidayPickUpTime()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                HolidayId = DbUtils.GetInt(reader, "HolidayId"),
                PickUpTimeId = DbUtils.GetInt(reader, "PickUpTimeId"),
                PickUpTimeTime = new PickUpTime()
                {
                    Id = DbUtils.GetInt(reader, "PickUpTimeId"),
                    Time = DbUtils.GetString(reader, "Time"),
                }
            };
        }
    }
}

