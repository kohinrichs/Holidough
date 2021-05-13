import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';


export const GoBack = () => {

    const history = useHistory();

    return (
        <>
            <i class="fas fa-angle-double-left ml-4 backButton"
                onClick={() => {
                    history.goBack();
                }}></i>

            <div>Ope! It looks like you might be lost.</div>

        </>
    );

}