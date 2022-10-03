import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getStreaks, reset } from '../features/streaks/streakSlice'
import {Container,Row,Col,Card,Form ,Button} from 'react-bootstrap'
function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    const { streaks, isLoading, isError, message } = useSelector(
        (state) => state.streaks
    )

    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login')
    //     }

    //     if (isError) {
    //         console.log(message)
    //     }

    //     dispatch(getStreaks())

    //     return () => {
    //         dispatch(reset())
    //     }
    // }, [user, navigate, isError, message, dispatch])

    return (
        <Container style={{marginTop:'32px'}}>
            <h3>Welcome </h3>
            <hr/>
            <Row >
                <Col xs={12} md={4} lg={4}></Col>
                <Col xs={12} md={4} lg={4}>
                {streaks.length > 0 ? (
                    <>
                        {streaks.map((streak) => (
                            <Card>
                                <Card.Body>
                                    {streak.text}
                                </Card.Body>
                            </Card>
                        ))}
                    </>
                    ) : (
                    <h3>You have not set any Streaks</h3>
                    )}
                </Col>
                <Col xs={12} md={4} lg={4}></Col>
            </Row>
        </Container>
    );
}

export default Dashboard;