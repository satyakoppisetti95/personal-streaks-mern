import { Card, Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { incrementStreak,deleteStreak } from '../features/streaks/streakSlice';
function StreakItem(props) {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const handleDetailModalClose = () => setShowDetailModal(false);
    const dispatch = useDispatch()

    const submitIncrementStreak = (e) => {
        e.preventDefault()
        dispatch(incrementStreak(props.streak._id))
        setShowDetailModal(false)
    }

    const submitDeleteStreak = (e) => {
        e.preventDefault()
        dispatch(deleteStreak(props.streak._id))
        setShowDetailModal(false)
    }

    const streakUpdated = new Date(props.streak.updatedAt);
    //check if today is the same day as streak updated
    const isToday = streakUpdated.toDateString() === new Date().toDateString();
    return (
        <>
            <Card style={{ marginTop: '5px' }} onClick={() => setShowDetailModal(true)}>
                <Card.Body>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>{props.streak.text}</div>
                        <div style={{ alignItems: 'center' }}>{props.streak.count}{props.streak.count > 0 ? <img src="./streak-fire.jpg" width={16} height={16} style={{ marginTop: '-5px' }} alt="streak"/> : <></>}</div>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={showDetailModal} onHide={handleDetailModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.streak.text}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-grid gap-2">
                        <Button onClick={submitIncrementStreak} disabled={isToday} >Mark as done</Button>
                        {isToday ? <div style={{color:'red'}}>You can only mark a streak as done once a day</div> : <></>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={submitDeleteStreak}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={() => setShowDetailModal(true)}>
                        Dismiss
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default StreakItem