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
    public class HolidayRepository : BaseRepository, IHolidayRepository
    {
        public HolidayRepository(IConfiguration configuration) : base(configuration) { }

        // Get All Holidays
        public List<Holiday> GetAllHolidays()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], [Date], IsAvailable
                        FROM Holiday
                        ORDER BY Date ASC";

                    var reader = cmd.ExecuteReader();
                    var holidays = new List<Holiday>();
                    
                    while (reader.Read())
                    {
                        holidays.Add(NewHolidayFromDb(reader));
                    }

                    reader.Close();

                    return holidays;
                }
            }
        }

        // Get All Holidays that are Available
        public List<Holiday> GetAllAvailableHolidays()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], [Date], IsAvailable
                        FROM Holiday
                        WHERE IsAvailable = 1
                        ORDER BY Date ASC";

                    var reader = cmd.ExecuteReader();
                    var holidays = new List<Holiday>();
                    while (reader.Read())
                    {
                        holidays.Add(NewHolidayFromDb(reader));
                    }

                    reader.Close();

                    return holidays;
                }
            }
        }

        // Get A Holiday By Its Id
        public Holiday GetHolidayById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name], [Date], IsAvailable
                        FROM Holiday
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Holiday holiday = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        holiday = NewHolidayFromDb(reader);
                    }
                    reader.Close();

                    return holiday;
                }
            }
        }

        public void AddHoliday(Holiday holiday)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [Holiday] (Name, Date, IsAvailable)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Date, @IsAvailable)";

                    DbUtils.AddParameter(cmd, "@Name", holiday.Name);
                    DbUtils.AddParameter(cmd, "@Date", holiday.Date);
                    DbUtils.AddParameter(cmd, "@IsAvailable", holiday.IsAvailable);

                    holiday.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateHoliday(Holiday holiday)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [Holiday] 
                            SET Name = @Name,
                                Date = @Date
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", holiday.Name);
                    DbUtils.AddParameter(cmd, "@Date", holiday.Date);
                    DbUtils.AddParameter(cmd, "@Id", holiday.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        // Need to get Holiday details as well as list of PickUpDays from the Holiday PickUpDays?
        private Holiday NewHolidayFromDb(SqlDataReader reader)
        {
            return new Holiday()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Date = DbUtils.GetDateTime(reader, "Date"),
                IsAvailable = reader.GetBoolean(reader.GetOrdinal("IsAvailable")),
            };
        }
    }
}
