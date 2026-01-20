// Importing the necessary modules 
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Fragment } from 'react';

const AlertComponent = ({severity, message}) => {
    if (severity === "success") {
        // Render the success alert 
        return(
            <Fragment> 
                <div className="fixed mt-[18px] left-0 z-[100] flex justify-start px-4 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300"> 
                    <div className="w-full sm:w-[350px] pointer-events-auto">
                        <Alert severity="success"> {message} </Alert>
                    </div>
                </div>
            </Fragment>
        )
    }

    // Else if the severity was not success 
    else {
        // Render the alert 
        return(
            <Fragment> 
                <div className="fixed mt-[18px] left-0 z-[100] flex justify-start px-4 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300"> 
                    <div className="w-full sm:w-[350px] pointer-events-auto">
                        <Alert severity="error"> {message} </Alert>
                    </div>
                </div>
            </Fragment>
        )
    }
}

// Exporting the alert component 
export default AlertComponent; 