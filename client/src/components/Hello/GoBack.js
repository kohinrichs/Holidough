import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';


export const GoBack = () => {

    const history = useHistory();

    return (
        <>
            <div>Ope! It looks like you might be lost.</div>
            <Button onClick={() => {
                history.goBack();
            }}>Go Back</Button>

        </>
    );

}