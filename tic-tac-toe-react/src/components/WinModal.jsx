import {Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const WinModalComp = ({handleNewGame, gameOverMessage, showWinModal, setShowWinModal}) => {
    const toggle = () => setShowWinModal(!showWinModal);
    return(
        <Modal backdrop="static"  isOpen={showWinModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                {gameOverMessage}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{toggle() + handleNewGame()}} className="modalButton">Play again!</Button>
            </ModalFooter>
        </Modal>
    );
};

export default WinModalComp