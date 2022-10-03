import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createStreak, getStreaks, reset } from '../features/streaks/streakSlice'
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import StreakItem from '../components/StreakItem'
function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const { streaks, isLoading, isError, message } = useSelector(
        (state) => state.streaks
    )

    const [showAddStreakModal, setShowAddStreakModal] = useState(false);
    const [addStreakText, setAddStreakText] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        if (isError) {
            console.log(message)
        }

        dispatch(getStreaks())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    const handleAddStreakModalClose = () => setShowAddStreakModal(false);
    const onChange = (e) => {
        setAddStreakText(e.target.value)
    }

    const addStreakSubmit = (e) => {
        e.preventDefault()

        dispatch(createStreak({ text: addStreakText }))
        setAddStreakText('')
        setShowAddStreakModal(false)
    }

    return (
        <Container style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Welcome </h3>
                <Button variant="primary" onClick={() => setShowAddStreakModal(true)}>Add Streak</Button>
            </div>
            <hr />
            <Row >
                <Col xs={12} md={4} lg={4}></Col>
                <Col xs={12} md={4} lg={4}>
                    {streaks.length > 0 ? (
                        <>
                            {streaks.map((streak) => (
                                <StreakItem streak={streak} key={streak._id}/>
                            ))}
                        </>
                    ) : (
                        <h3>You have not set any Streaks</h3>
                    )}
                </Col>
                <Col xs={12} md={4} lg={4}></Col>
            </Row>

            <Modal show={showAddStreakModal} onHide={handleAddStreakModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Streak</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" value={addStreakText} onChange={onChange} id='title' name='title' />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddStreakModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addStreakSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Dashboard;