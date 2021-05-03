import React, { useState, useContext, useEffect } from 'react';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { UserProfileCard } from './UserProfileCard';

export const UserProfileList = () => {

    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext);

    useEffect(() => {
        getAllUserProfiles()
    }, []);

    return (
        <div>
            <h2>User Profiles</h2>
            <div>
                {
                    userProfiles.map((up) => {
                        return <UserProfileCard key={up.id} userProfile={up} />;
                    })
                }
            </div>
        </div>
    );
}