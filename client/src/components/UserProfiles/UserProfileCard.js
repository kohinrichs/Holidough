import React from 'react';
import { Card, CardBody } from 'reactstrap';

export const UserProfileCard = ({ userProfile }) => {
    return (
        <Card className="userProfileCard">
            <CardBody>
                <strong>{userProfile.firstName} {userProfile.lastName}</strong>
                <p>{userProfile.userType.role}</p>
                <p>{userProfile.phoneNumber}</p>
                <p>{userProfile.email}</p>
            </CardBody>
        </Card>
    );
};