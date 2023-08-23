import { Button } from "reactstrap"

const Tile = ({value, onTileClick}) => {
    return <Button 
                color="light" 
                className="tile"
                onClick={onTileClick}
            >
                {value}
            </Button>
}

export default Tile