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
    public class HolidayPickUpDayRepository : BaseRepository, IHolidayPickUpDayRepository
    {
        public HolidayPickUpDayRepository(IConfiguration configuration) : base(configuration) { }

        // Get PickUp Days By Holiday Id
        public List <HolidayPickUpDay> GetHolidayPickUpDaysByHolidayId(int holidayId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT hpd.Id, hpd.PickUpDayId, hpd.HolidayId,
                        pd.[Day]
                        FROM HolidayPickUpDay hpd
                        LEFT JOIN PickUpDay pd on pd.id = hpd.PickUpDayId
                        WHERE hpd.HolidayId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", holidayId);

                    var reader = cmd.ExecuteReader();

                    var holidayPickUpDays = new List<HolidayPickUpDay>();

                    while (reader.Read())
                    {
                        holidayPickUpDays.Add(NewHolidayPickUpDayFromDb(reader));
                    }
                    reader.Close();

                    return holidayPickUpDays;
                }
            }
        }

        public void AddHolidayPickUpDay(int pickUpDayId, int holidayId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [HolidayPickUpDay] (PickUpDayId, HolidayId)
                        VALUES (@PickUpDayId, @HolidayId)";

                    DbUtils.AddParameter(cmd, "@PickUpDayId", pickUpDayId);
                    DbUtils.AddParameter(cmd, "@HolidayId", holidayId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private HolidayPickUpDay NewHolidayPickUpDayFromDb(SqlDataReader reader)
        {
            return new HolidayPickUpDay()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                HolidayId = DbUtils.GetInt(reader, "HolidayId"),
                PickUpDayId = DbUtils.GetInt(reader, "PickUpDayId"),
                PickUpDayName = new PickUpDay()
                {
                    Id = DbUtils.GetInt(reader, "PickUpDayId"),
                    Day = DbUtils.GetString(reader, "Day"),
                }
            };
        }
    }
}
