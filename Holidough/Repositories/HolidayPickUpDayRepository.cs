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
        public HolidayPickUpDay GetHolidayPickUpDaysByHolidayId(int holidayId)
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

                    HolidayPickUpDay holidayPickUpDays = null;

                    while (reader.Read())
                    {
                        if (holidayPickUpDays == null)
                        {
                            holidayPickUpDays = new HolidayPickUpDay()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                HolidayId = DbUtils.GetInt(reader, "HolidayId"),
                                PickUpDayNames = new List<PickUpDay>()
                            };
                        }

                        if (DbUtils.IsNotDbNull(reader, "PickUpDayId"))
                        {
                            holidayPickUpDays.PickUpDayNames.Add(new PickUpDay()
                            { 
                                Id = DbUtils.GetInt(reader, "PickUpDayId"),
                                Day = DbUtils.GetString(reader, "Day"),
                            });
                        }
                    }
                    reader.Close();

                    return holidayPickUpDays;
                }
            }
        }

    }
}
