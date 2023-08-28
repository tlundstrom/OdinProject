const JsonCall = <T,>(source: string, setData: (value: T[]) => void) => {

    const getData = () =>{
        let requestOptions: RequestInit ={ 
            method: "GET",
            redirect: "follow"
        };

        fetch(`http://localhost:3030/${source}`, requestOptions)
            .then((response) =>response.json())
            .then((result) => setData(result))
            .catch((error)=>console.log("error: ", error))

    }
    return getData();
}

export default JsonCall;