import { useHistory } from 'react-router-dom';
import "./Hello.css"


export const GoBack = () => {

    const history = useHistory();

    return (
        <>
            <i class="fas fa-angle-double-left ml-4 backButton"
                onClick={() => {
                    history.goBack();
                }}></i>

            <div className="error"><h1>Ope! It looks like you might be lost.</h1></div>

        </>
    );

}