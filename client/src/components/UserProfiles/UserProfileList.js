import React, { useState, useContext, useEffect } from 'react';
import { Container } from 'reactstrap';
import { UserProfileContext } from '../../providers/UserProfileProvider';
import { UserProfileCard } from './UserProfileCard';
import "./UserProfiles.css"

export const UserProfileList = () => {

    const { userProfiles, getAllUserProfiles } = useContext(UserProfileContext);

    useEffect(() => {
        getAllUserProfiles()
    }, []);

    return (
        <Container className="col-sm-6 col-lg-10 justify-content-center">
            <div>
                <div className="userProfileHeader">
                    <h2>User Profiles</h2>
                </div>
                <div className="userProfileCards">
                    {
                        userProfiles.map((up) => {
                            return <UserProfileCard key={up.id} userProfile={up} />;
                        })
                    }
                </div>
            </div>
        </Container>
    );
}