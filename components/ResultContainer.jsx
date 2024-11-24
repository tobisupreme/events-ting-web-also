const ResultContainer = ({result}) => {
    console.log(result);

    // Result error - (early) return component to show error message
    if (result.status === "error") {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-500">Error</h1>
                    <p className="text-lg text-gray-600">{result.message}</p>
                </div>
            </div>
        );
    }

    // Check whether user is already checked in
    if (result.data.ticket.status === "Confirmed") {
        // If YES - Confirm that user is already checked in
        // I'd (early) return a component here to show that user is already checked in
        return (
            <div className="flex justify-center items-center h-full">
                <div className="text-center">
                    <svg class="mx-auto w-10 h-10 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd"/>
                    </svg>
                    <h1 className="text-2xl font-bold text-green-500">Checked In</h1>
                    <p className="text-lg text-gray-600">This person has already been checked in successfully</p>
                </div>
            </div>
        )
    }
        
    // If NO - Do something to set user ticket status to checked in and return the component below
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/events/registrations/${result.data.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: "Confirmed"
        })
    }).then(response => response.json()).then(data => {
        return (
            <div>
                <div className="flex justify-center items-center h-full">
                    <div className="text-center">
                        <svg class="mx-auto w-10 h-10 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd"/>
                        </svg>
                        <h1 className="text-2xl font-bold text-green-500">Success</h1>
                        <p className="text-lg text-gray-600">You have been checked in successfully</p>
                    </div>
                </div>
            </div>
        );
    })
    
};

export default ResultContainer;