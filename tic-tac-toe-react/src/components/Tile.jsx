import { useState } from "react";
import { Button } from "reactstrap"

const Tile = () => {
    const [value, setValue] = useState(null);

    const handleClick = ()=> {
        setValue('X');
    }
    return <Button 
                color="light" 
                className="tile"
                onClick={handleClick}
            >
                {value}
            </Button>
}

export default Tile