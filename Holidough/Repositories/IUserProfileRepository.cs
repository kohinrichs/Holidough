using Holidough.Models;
using System.Collections.Generic;

namespace Holidough.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        List<UserProfile> GetAllUserProfiles();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}
