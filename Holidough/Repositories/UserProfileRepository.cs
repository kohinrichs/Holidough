using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Holidough.Models;
using Holidough.Utils;

namespace Holidough.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
            public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

            public UserProfile GetByFirebaseUserId(string firebaseUserId)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseUserId, up.FirstName AS UserProfileFirstName, up.LastName AS UserProfileLastName, up.PhoneNumber, up.Email, up.UserTypeId,
                               ut.Role AS UserTypeRole
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE FirebaseUserId = @FirebaseuserId";

                        DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                        UserProfile userProfile = null;

                        var reader = cmd.ExecuteReader();
                        if (reader.Read())
                        {
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "UserProfileFirstName"),
                                LastName = DbUtils.GetString(reader, "UserProfileLastName"),
                                PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                                Email = DbUtils.GetString(reader, "Email"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                UserType = new UserType()
                                {
                                    Id = DbUtils.GetInt(reader, "UserTypeId"),
                                    Role = DbUtils.GetString(reader, "UserTypeRole"),
                                }
                            };
                        }
                        reader.Close();

                        return userProfile;
                    }
                }
            }

            public void Add(UserProfile userProfile)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, PhoneNumber, Email, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @PhoneNumber, @Email, @UserTypeId)";
                        DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                        DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                        DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                        DbUtils.AddParameter(cmd, "@PhoneNumber", userProfile.PhoneNumber);
                        DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                        DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                        userProfile.Id = (int)cmd.ExecuteScalar();
                    }
                }
            }
        }
}
