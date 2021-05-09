import React from 'react';
import { Card, CardBody } from 'reactstrap';

export const UserProfileCard = ({ userProfile }) => {
    return (
        <Card>
            <CardBody>
                <strong>{userProfile.firstName} {userProfile.lastName}</strong>
                <p>{userProfile.phoneNumber}</p>
                <p>{userProfile.email}</p>
                <p>{userProfile.userType.role}</p>

            </CardBody>
        </Card>
    );
};