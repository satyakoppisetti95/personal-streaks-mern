import axios from 'axios'

const API_URL = '/api/streaks/'


const createStreak = async (streakData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL, streakData, config)
  
    return response.data
}

const getStreaks = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
}

const deleteStreak = async (streakId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + streakId, config)
  
    return response.data
}

const streakService = {
    createStreak,
    getStreaks,
    deleteStreak,
}

export default streakService