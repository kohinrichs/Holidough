import React from 'react';
import { useHistory, } from 'react-router-dom';
import { Card, CardBody, Button } from 'reactstrap';

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